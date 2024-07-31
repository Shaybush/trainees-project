import {AfterViewInit, Component, ViewChild} from '@angular/core';
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

export interface PeriodicElement {
  name: string;
  id: number;
  grade: string;
  subject: string;
  email: string;
  date_joined: Date | number;
  address: string;
  city: string;
  country: string;
  zip: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', grade: 'H', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 2, name: 'Helium', grade: 'He', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 3, name: 'Lithium', grade: 'Li', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 4, name: 'Beryllium', grade: 'Be', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 5, name: 'Boron', grade: 'B', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 6, name: 'Carbon', grade: 'C', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 7, name: 'Nitrogen', grade: 'N', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 8, name: 'Oxygen', grade: 'O', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 9, name: 'Fluorine', grade: 'F', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 10, name: 'Neon', grade: 'Ne', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 11, name: 'Sodium', grade: 'Na', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 12, name: 'Magnesium', grade: 'Mg', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 13, name: 'Aluminum', grade: 'Al', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 14, name: 'Silicon', grade: 'Si', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 15, name: 'Phosphorus', grade: 'P', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 16, name: 'Sulfur', grade: 'S', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 17, name: 'Chlorine', grade: 'Cl', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 18, name: 'Argon', grade: 'Ar', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 19, name: 'Potassium', grade: 'K', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
  {id: 20, name: 'Calcium', grade: 'Ca', subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 },
];

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
    EmptyStringPipe
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['ID', 'name', 'date', 'grade', 'subject'];
  selectedRows: PeriodicElement;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
