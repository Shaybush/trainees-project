import {Component, Input} from '@angular/core';
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {EChartsOption} from "echarts";
import {StudentsHttpDummyDataService} from "../../../../shared/services/students-http-dummy-data.service";
import {firstValueFrom, take} from "rxjs";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {
  IAnalysisChartLineStudentExams,
  IAnalysisChartLineStudentExamsWithIdModel
} from "../../models/i-analysis-view.model";

@Component({
  selector: 'app-analysis-chart-line',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './analysis-chart-line.component.html',
  styleUrl: './analysis-chart-line.component.css'
})
export class AnalysisChartLineComponent  {
  @Input()
  set hideData(value: boolean) {
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false;
      this._hideData = value
    })
  }
  get hideData(): boolean {
    return this._hideData;
  }
  isLoading?: boolean
  private  _hideData: boolean;
  chartOption: EChartsOption;
  studentExams: IAnalysisChartLineStudentExamsWithIdModel[] ;

  constructor( private studentsHttpDummyDataService:StudentsHttpDummyDataService) {
    firstValueFrom(
    this.studentsHttpDummyDataService.getStudents().pipe(take(1))
    ).then(
      x => {
          this.studentExams = this.setExam(x)
          this.chartOptionInit()
      }
    )
  }

  setExam (s:IStudentElementModel[]) {
  // create json with student id (name) and exam array for each student
  const studentsExamArray : {
    [key:string] : IAnalysisChartLineStudentExams[]
  } =
    // run on the above object and reduce the array to calc the average grade for each tests at the time
    s.reduce((p,c) => {
        if (p.hasOwnProperty(c.name)){
          p[c.name].push(c)
        }else {
          p[c.name] = [c]
        }
        return p;
      } , {}
    )
  // sort students array exams
  Object.keys(studentsExamArray).forEach(k=>{
  studentsExamArray[k]=studentsExamArray[k]?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

  const newGradeArr =   Object.keys(studentsExamArray).reduce((pp,cc)=> {
    pp.push({
      id: cc ,
      'exams':studentsExamArray?.[cc]?.reduce((ppp,ccc,iii)=> {
        // console.log({ccc})
        if (iii){
          ppp?.push({
            'date': (ccc )?.date,
            'grade':   ((ppp.at(iii -1) ?.grade * iii )  +  (ccc as any)?.grade)/ (iii+1)
          })
        }else {
          ppp?.push({
            'date': (ccc )?.date,
            'grade':   (ccc )?.grade
          })
        }
        return ppp },[] as IAnalysisChartLineStudentExamsWithIdModel['exams'])
    })
    return pp;
  }, []  as IAnalysisChartLineStudentExamsWithIdModel[])
  return  newGradeArr;
}
  chartOptionInit() {
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.studentExams.map(student => student.id)
      },
      xAxis: {
        type: 'time',
        boundaryGap: [0, 0]
      },
      yAxis: {
        type: 'value'
      },
      series: this.studentExams.map(student => ({
        name: student.id,
        type: 'line',
        data: student.exams.map(exam => [exam.date, exam.grade])
      }))
    };
  }
}
