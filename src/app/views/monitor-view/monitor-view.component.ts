import {Component, OnInit} from '@angular/core';
import {MonitorFormHeaderComponent} from "./components/monitor-form-header/monitor-form-header.component";
import {MonitorTableComponent} from "./components/monitor-table/monitor-table.component";
import {
  IAggregateStudentGradesModel,
  IMonitorFilterOptionsModel,
  IMonitorTableDataModel
} from "./models/i-monitor-view.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {IStudentElementModel} from "../../shared/models/i-student-data.model";
import {StudentsDataService} from "../../shared/services/students-data.service";

@Component({
  selector: 'app-monitor-view',
  standalone: true,
  imports: [
    MonitorFormHeaderComponent,
    MonitorTableComponent,
    MatCard,
    MatCardContent
  ],
  templateUrl: './monitor-view.component.html',
  styleUrl: './monitor-view.component.css'
})
export class MonitorViewComponent implements OnInit {
  readonly MIN_AVERAGE: number = 65;

  students: IStudentElementModel[];
  monitorTableData: IMonitorTableDataModel[];
  filterOptions: IMonitorFilterOptionsModel;

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.students = this.studentsDataService.getStudentsValue();
    this.monitorTableData = this.aggregateStudentGrades(this.students);
  }

  setFilterOptions(filterOptions: IMonitorFilterOptionsModel): void {
    this.filterOptions = filterOptions;
    this.filterTableData();
  }

  filterTableData(): void {
    const filteredStudents = this.filterStudentsByIdAndName();
    const aggregatedData = this.aggregateStudentGrades(filteredStudents);
    this.monitorTableData = this.filterByPassFail(aggregatedData);
  }

  private filterStudentsByIdAndName(): IStudentElementModel[] {
    const { ids, names } = this.filterOptions;

    return this.students.filter(student => {
      const matchId = !ids || ids.length === 0 || ids.includes(student.id);
      const matchName = !names || names.length === 0 || names.includes(student.name.toLowerCase());
      return matchId && matchName;
    });
  }

  private aggregateStudentGrades(students: IStudentElementModel[]): IMonitorTableDataModel[] {
    const result = students.reduce((acc, student) => {
      const { name, grade } = student;
      const key = name.toLowerCase();
      if (!acc[key]) acc[key] = {  id: crypto.randomUUID() ,name, totalGrades: 0, exams: 0 };
      acc[key].totalGrades += grade;
      acc[key].exams += 1;
      return acc;
    }, {} as Record<string, IAggregateStudentGradesModel>);

    return Object.values(result).map(item => ({
      id: item.id,
      name: item.name,
      average: Math.floor(item.totalGrades / item.exams),
      exams: item.exams,
    }));
  }

  private filterByPassFail(data: IMonitorTableDataModel[]): IMonitorTableDataModel[] {
    const { isFailed, isPassed } = this.filterOptions;

    if (isFailed || isPassed) {
      return data.filter(item => {
        if (isFailed && item.average < this.MIN_AVERAGE) return true;
        if (isPassed && item.average >= this.MIN_AVERAGE) return true;
        return false;
      });
    }

    return data;
  }
}
