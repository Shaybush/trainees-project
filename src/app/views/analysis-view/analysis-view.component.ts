import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AnalysisFormHeaderComponent } from './components/analysis-form-header/analysis-form-header.component';
import {
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
import { AnalysisChartBarComponent } from './components/analysis-chart-bar/analysis-chart-bar.component';
import {
  filterPerSubjectChartData,
  filterStudentAvgByIdChartData,
} from './filters/analysis-chart-filters';
import { AnalysisChartLineComponent } from './components/analysis-chart-line/analysis-chart-line.component';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-analysis-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    AnalysisFormHeaderComponent,
    CdkDropList,
    CdkDrag,
    AnalysisChartBarComponent,
    AnalysisChartLineComponent,
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

  constructor(private studentsDataService: StudentsHttpDummyDataService) {}

  ngOnInit(): void {
    this.studentsDataService.getStudents().pipe(takeUntil(this.ngUnsubscribe)).subscribe(students => {
      this.students = students;

      // todo - improve
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
      this.studentsAvgByIdChartData = filterStudentAvgByIdChartData(this.students, filterOptions);
      this.perSubjectChartData = filterPerSubjectChartData(this.students, filterOptions);

      this.chartsInfo = this.chartsInfo.map(chartItem => {
        if(chartItem.id === 2){
          return {...chartItem, data: filterStudentAvgByIdChartData(this.students, filterOptions)}
        }
          else if(chartItem.id === 3){
          return {...chartItem, data: filterPerSubjectChartData(this.students, filterOptions)}
        }
          return chartItem;
      })
    }
  }

  initChartsInfo(): void {
    this.chartsInfo = [
      {
        id: 1,
        name: "Chart 1 - All Student's Averages",
      },
      {
        id: 2,
        name: 'Chart 2 - Selected IDs Student Average',
        data: this.studentsAvgByIdChartData,
      },
      {
        id: 3,
        name: 'Chart 3 - Selected Subject Grades Average',
        data: this.perSubjectChartData,
      },
    ];
  }
}
