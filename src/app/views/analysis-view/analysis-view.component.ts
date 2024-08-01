import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {AnalysisFormHeaderComponent} from "./components/analysis-form-header/analysis-form-header.component";
import {IAnalysisChartDataModel, IAnalysisFilterOptionsModel, IChartsInfoModel} from "./models/i-analysis-view.model";
import {IStudentElementModel} from "../../shared/models/i-student-data.model";
import {StudentsDataService} from "../../shared/services/students-data.service";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {AnalysisChartComponent} from "./components/analysis-chart/analysis-chart.component";
import {
  filterOverTimeChartData,
  filterPerSubjectChartData,
  filterStudentAvgChartData
} from "./filters/analysis-chart-filters";

@Component({
  selector: 'app-analysis-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    AnalysisFormHeaderComponent,
    CdkDropList,
    CdkDrag,
    AnalysisChartComponent
  ],
  templateUrl: './analysis-view.component.html',
  styleUrl: './analysis-view.component.css'
})
export class AnalysisViewComponent implements OnInit {
  students: IStudentElementModel[];

  overTimeChartData: IAnalysisChartDataModel[];
  perSubjectChartData: IAnalysisChartDataModel[];
  studentAvgChartData: IAnalysisChartDataModel[];

  chartsInfo: IChartsInfoModel[];

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.students = this.studentsDataService.getStudentsValue();
    this.initChartsData();
  }

  drop(event: CdkDragDrop<{ header: string, context: string }[]>): void {
    console.log(`previousIndex - ${event.previousIndex}, currentIndex - ${event.currentIndex}`)
    moveItemInArray(this.chartsInfo, event.previousIndex, event.currentIndex);
  }

  initChartsData(): void {
    this.overTimeChartData = filterOverTimeChartData(this.students);
    this.perSubjectChartData = filterPerSubjectChartData(this.students);
    this.studentAvgChartData = filterStudentAvgChartData(this.students);

    this.initChartsInfo();
  }

  initChartsInfo(): void {
    this.chartsInfo = [
      {
        name: "Chart 1 - All Student's Averages",
        data: this.overTimeChartData,
      },
      {
        name: "Chart 2 - Selected IDs Student Average",
        data: this.overTimeChartData,
      },
      {
        name: "Chart 3 - Selected Subject Grades Average",
        data: this.overTimeChartData,
      }
    ]
  }

  setFilterOptions(filterOptions: IAnalysisFilterOptionsModel): void {
    console.log(filterOptions)
    // this.perSubjectChartData = filterPerSubjectChartData(this.students, filterOptions);
    // this.studentAvgChartData = filterStudentAvgChartData(this.students, filterOptions);
  }



}
