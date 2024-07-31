import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {DefaultDatePipe} from "../../shared/pipes/default-date/default-date.pipe";
import {EmptyStringPipe} from "../../shared/pipes/empty-string/empty-string.pipe";
import {MatIcon} from "@angular/material/icon";
import {IStudentElementModel} from "../../shared/models/i-student-data.model";
import {StudentsDataService} from "../../shared/services/students-data.service";

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
    DatePipe,
    DefaultDatePipe,
    EmptyStringPipe,
    MatIcon
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'name', 'date', 'grade', 'subject', 'action'];
  dataSource: MatTableDataSource<IStudentElementModel>;
  filteredDataSource: MatTableDataSource<IStudentElementModel>;

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.studentsDataService.getStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource(students);
      this.filteredDataSource = new MatTableDataSource(students);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeStudent(student: IStudentElementModel): void {
    const filterStudents = this.dataSource.data.filter(dataStudent => dataStudent.id !== student.id);
    this.studentsDataService.setStudents(filterStudents);
    this.dataSource.paginator = this.paginator;
  }
}
