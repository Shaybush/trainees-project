import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DefaultDatePipe } from '../../../../shared/pipes/default-date/default-date.pipe';
import { EmptyStringPipe } from '../../../../shared/pipes/empty-string/empty-string.pipe';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { IStudentElementModel } from '../../../../shared/models/i-student-data.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    DefaultDatePipe,
    EmptyStringPipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements AfterViewInit {
  @Output() removeStudent: EventEmitter<IStudentElementModel> = new EventEmitter<IStudentElementModel>();
  @Output() openDetailsCard: EventEmitter<IStudentElementModel> = new EventEmitter<IStudentElementModel>();

  @Input({ required: true }) dataSource: MatTableDataSource<IStudentElementModel>;
  @Input({ required: true }) displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  removeStudentByStudentObject(student: IStudentElementModel): void {
    if (
      confirm(
        `Are you sure you want to remove "${student.name}" with id - ${student.id} ?`,
      )
    ) {
      this.removeStudent.emit(student);
    }
  }
}
