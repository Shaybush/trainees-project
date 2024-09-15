import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AnalysisFormHeaderComponent } from './components/analysis-form-header/analysis-form-header.component';
import {
  EAnalysisChartID,
  IAnalysisChartDataModel,
  IAnalysisFilterOptionsModel,
  IChartsInfoModel,
} from './models/i-analysis-view.model';
import { IStudentElementModel } from '../../shared/models/i-student-data.model';
import { StudentsHttpDummyDataService } from '../../shared/services/students-http-dummy-data.service';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  filterPerSubjectChartData,
  filterStudentAvgByIdChartData,
} from './filters/analysis-chart-filters';
import { AnalysisChartLineComponent } from './components/analysis-chart-line/analysis-chart-line.component';
import { Subject, takeUntil } from "rxjs";
import { AnalysisStudentAverageChartBarComponent } from "./components/analysis-student-average-chart-bar/analysis-student-average-chart-bar.component";
import { AnalysisGradesAverageChartBarComponent } from "./components/analysis-grades-average-chart-bar/analysis-grades-average-chart-bar.component";

@Component({
  selector: 'app-analysis-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    AnalysisFormHeaderComponent,
    CdkDropList,
    CdkDrag,
    AnalysisChartLineComponent,
    AnalysisStudentAverageChartBarComponent,
    AnalysisGradesAverageChartBarComponent
  ],
  templateUrl: './analysis-view.component.html',
  styleUrl: './analysis-view.component.css',
})
export class AnalysisViewComponent implements OnInit, OnDestroy {
  students: IStudentElementModel[];

  perSubjectChartData: IAnalysisChartDataModel[];
  studentsAvgByIdChartData: IAnalysisChartDataModel[];

  chartsInfo: IChartsInfoModel[];

  // unsubscribe
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // enum 
  eChartId = EAnalysisChartID

  constructor(private studentsDataService: StudentsHttpDummyDataService) { }

  ngOnInit(): void {
    this.studentsDataService.getStudents().pipe(takeUntil(this.ngUnsubscribe)).subscribe(students => {
      this.students = students;

      // TODO - improve
      this.perSubjectChartData = filterPerSubjectChartData(this.students);
      this.studentsAvgByIdChartData = filterStudentAvgByIdChartData(this.students);

      this.initChartsInfo();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  drop(event: CdkDragDrop<{ header: string; context: string }[]>): void {
    moveItemInArray(this.chartsInfo, event.previousIndex, event.currentIndex);
  }

  setFilterOptions(filterOptions: IAnalysisFilterOptionsModel): void {
    if (this.students) {
      this.studentsAvgByIdChartData = filterStudentAvgByIdChartData(this.students, filterOptions.ids);
      this.perSubjectChartData = filterPerSubjectChartData(this.students, filterOptions.subjects);

      this.chartsInfo = this.chartsInfo.map(chartItem => {
        if (chartItem.id === EAnalysisChartID.ANALYSIS_STUDENT_AVG_CHART) {
          return { ...chartItem, data: this.studentsAvgByIdChartData }
        }
        else if (chartItem.id === EAnalysisChartID.ANALYSIS_SELECTED_SUBJECT_GRADES_AVG_CHART) {
          return { ...chartItem, data: this.perSubjectChartData }
        }
        return chartItem;
      })
    }
  }

  initChartsInfo(): void {
    this.chartsInfo = [
      {
        id: EAnalysisChartID.ANALYSIS_ALL_STUDENT_CHART,
        name: "Chart 1 - All Student's Averages",
      },
      {
        id: EAnalysisChartID.ANALYSIS_STUDENT_AVG_CHART,
        name: 'Chart 2 - Selected IDs Student Average',
        data: this.studentsAvgByIdChartData,
      },
      {
        id: EAnalysisChartID.ANALYSIS_SELECTED_SUBJECT_GRADES_AVG_CHART,
        name: 'Chart 3 - Selected Subject Grades Average',
        data: this.perSubjectChartData,
      },
    ];
  }
}
