import { Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {AnalysisFormHeaderComponent} from "./components/analysis-form-header/analysis-form-header.component";
import {IAnalysisChartDataModel, IAnalysisFilterOptionsModel, IChartsInfoModel} from "./models/i-analysis-view.model";
import {IStudentElementModel} from "../../shared/models/i-student-data.model";
import {StudentsHttpDummyDataService} from "../../shared/services/students-http-dummy-data.service";
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

  constructor(private studentsDataService: StudentsHttpDummyDataService) {
  }

  ngOnInit(): void {
    this.studentsDataService.getStudents().subscribe(students => {
      this.students = students;
    })
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
        data: [this.overTimeChartData?.at(0)],
      },
      {
        name: "Chart 2 - Selected IDs Student Average",
        data: [this.overTimeChartData?.at(2)],
      },
      {
        name: "Chart 3 - Selected Subject Grades Average",
        data: [this.overTimeChartData?.at(1)],
      }
    ]
  }

  setFilterOptions(filterOptions: IAnalysisFilterOptionsModel): void {
    console.log(filterOptions)
    // this.perSubjectChartData = filterPerSubjectChartData(this.students, filterOptions);
    // this.studentAvgChartData = filterStudentAvgChartData(this.students, filterOptions);
  }



}
