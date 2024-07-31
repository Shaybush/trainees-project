import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {IStudentElementModel} from "../../shared/models/i-student-data.model";
import {StudentsDataService} from "../../shared/services/students-data.service";
import {DataDetailsCardComponent} from "./components/data-details-card/data-details-card.component";
import {DataHeaderComponent} from "./components/data-header/data-header.component";
import {DataTableComponent} from "./components/data-table/data-table.component";
import {MatTableDataSource} from "@angular/material/table";
import {displayedColumnsConfig} from "./config/data-table.config";

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    DataDetailsCardComponent,
    DataHeaderComponent,
    DataTableComponent,
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DataViewComponent implements OnInit {
  isDetailsCardOpen: boolean = false;
  displayedColumns: string[] = displayedColumnsConfig;
  dataSource: MatTableDataSource<IStudentElementModel> = new MatTableDataSource<IStudentElementModel>();
  chosenStudent: IStudentElementModel | null = null;

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.subscribeStudents();
  }

  subscribeStudents(): void {
    this.studentsDataService.getStudents().subscribe(students => {
      this.dataSource.data = students;
    })
  }

  removeStudent(student: IStudentElementModel): void {
    const filteredStudents = this.dataSource.data.filter(dataStudent => dataStudent.id !== student.id);
    this.studentsDataService.setStudents(filteredStudents);
  }

  openDetailsCard(student?: IStudentElementModel): void {
    this.isDetailsCardOpen = false;

    // reopen details card
    setTimeout(() => {
      this.chosenStudent = student ? student : null;
      this.isDetailsCardOpen = true;
    }, 100)

  }

  closeDetailsCard(): void {
    this.isDetailsCardOpen = false;
    this.chosenStudent = null;
  }
}
