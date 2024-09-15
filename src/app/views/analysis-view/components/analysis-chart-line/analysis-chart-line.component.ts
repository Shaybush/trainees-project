import { Component, Input } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { StudentsHttpDummyDataService } from '../../../../shared/services/students-http-dummy-data.service';
import { firstValueFrom, take } from 'rxjs';
import { IStudentElementModel } from '../../../../shared/models/i-student-data.model';
import {
  IAnalysisChartLineStudentExams,
  IAnalysisChartLineStudentExamsWithIdModel,
} from '../../models/i-analysis-view.model';

@Component({
  selector: 'app-analysis-chart-line',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './analysis-chart-line.component.html',
  styleUrl: './analysis-chart-line.component.css',
})
export class AnalysisChartLineComponent {
  @Input()
  set hideData(value: boolean) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this._hideData = value;
    });
  }
  get hideData(): boolean {
    return this._hideData;
  }
  isLoading?: boolean;
  private _hideData: boolean;
  chartOption: EChartsOption;
  studentExams: IAnalysisChartLineStudentExamsWithIdModel[];

  constructor(
    private studentsHttpDummyDataService: StudentsHttpDummyDataService,
  ) {
    firstValueFrom(
      this.studentsHttpDummyDataService.getStudents().pipe(take(1)),
    ).then(students => {
      this.studentExams = this.setExam(students);
      this.chartOptionInit();
    });
  }

  private setExam(students: IStudentElementModel[]): IAnalysisChartLineStudentExamsWithIdModel[] {
    const studentsExamArray = this.groupStudentsExamsByName(students);
    this.sortStudentExams(studentsExamArray);
    return this.calculateAverageGrades(studentsExamArray);
  }

  private groupStudentsExamsByName(students: IStudentElementModel[]): { [key: string]: IAnalysisChartLineStudentExams[] } {
    return students.reduce((acc, student) => {
      if (acc.hasOwnProperty(student.name)) {
        acc[student.name].push(student);
      } else {
        acc[student.name] = [student];
      }
      return acc;
    }, {} as { [key: string]: IAnalysisChartLineStudentExams[] });
  }

  private sortStudentExams(studentsExamArray: { [key: string]: IAnalysisChartLineStudentExams[] }) {
    Object.keys(studentsExamArray).forEach(studentName => {
      studentsExamArray[studentName] = studentsExamArray[studentName].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    });
  }

  private calculateAverageGrades(studentsExamArray: { [key: string]: IAnalysisChartLineStudentExams[] }): IAnalysisChartLineStudentExamsWithIdModel[] {
    return Object.keys(studentsExamArray).reduce((result, studentName) => {
      const studentExams = studentsExamArray[studentName];
      const examsWithAverages = studentExams.reduce((examResult, exam, index) => {
        const previousGrade = index > 0 ? examResult[index - 1].grade : 0;
        const averageGrade = index > 0
          ? (previousGrade * index + exam.grade) / (index + 1)
          : exam.grade;

        examResult.push({
          date: exam.date,
          grade: Math.floor(averageGrade)
        });

        return examResult;
      }, [] as IAnalysisChartLineStudentExamsWithIdModel['exams']);

      result.push({
        id: studentName,
        exams: examsWithAverages,
      });

      return result;
    }, [] as IAnalysisChartLineStudentExamsWithIdModel[]);
  }

  private chartOptionInit() {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: this.studentExams.map(student => student.id),
      },
      xAxis: {
        type: 'time',
        boundaryGap: [0, 0],
      },
      yAxis: {
        type: 'value',
      },
      series: this.studentExams.map(student => ({
        name: student.id,
        type: 'line',
        data: student.exams.map(exam => [exam.date, exam.grade]),
      })),
    };
  }
}
