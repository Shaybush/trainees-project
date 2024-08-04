import { Component, Input } from '@angular/core';
import { IMonitorTableDataModel } from '../../models/i-monitor-view.model';
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
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { IsPassedDirective } from '../../directives/is-passed.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-monitor-table',
  standalone: true,
  imports: [
    DefaultDatePipe,
    EmptyStringPipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
    DecimalPipe,
    IsPassedDirective,
    MatProgressSpinner,
  ],
  templateUrl: './monitor-table.component.html',
  styleUrl: './monitor-table.component.css',
})
export class MonitorTableComponent {
  @Input() monitorTableData: IMonitorTableDataModel[];
  displayedColumns: string[] = ['ID', 'Name', 'Average', 'Exams'];
}
