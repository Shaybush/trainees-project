import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormInputMultiselectComponent } from '../../../../shared/components/form/form-input-multiselect/form-input-multiselect.component';
import {
  IMonitorFilterOptionsModel,
  IMonitorFormModel,
} from '../../models/i-monitor-view.model';
import { StudentsHttpDummyDataService } from '../../../../shared/services/students-http-dummy-data.service';
import { IStudentElementModel } from '../../../../shared/models/i-student-data.model';
import { ArrayUtilsService } from '../../../../shared/services/util/arrays-utils.service';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  startWith, Subject,
  take, takeUntil,
} from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { FiltersService } from '../../../../shared/services/filters.service';
import { IMonitorFiltersModel } from '../../../../shared/models/i-filter.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-monitor-form-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputMultiselectComponent,
    MatCheckbox,
    MatButton,
  ],
  templateUrl: './monitor-form-header.component.html',
  styleUrl: './monitor-form-header.component.css',
})
export class MonitorFormHeaderComponent implements OnInit, OnDestroy {
  @Output() setFilterOptions: EventEmitter<IMonitorFilterOptionsModel> =
    new EventEmitter<IMonitorFilterOptionsModel>();

  monitorForm: FormGroup<IMonitorFormModel>;
  students: IStudentElementModel[];
  idsSelectOptions: number[];
  namesSelectOptions: string[];

  // unsubscribe
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private studentsDataService: StudentsHttpDummyDataService,
    private filtersService: FiltersService,
  ) {}

  ngOnInit(): void {
    this.initMonitorForm();
    firstValueFrom(
      this.studentsDataService.getStudents().pipe(take(1))).then(students => {
      this.students = students;
      this.initIdsSelectOptions();
      this.initNamesSelectOptions();
      this.subscribeMonitorFormChanges();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initMonitorForm(): void {
    this.monitorForm = new FormGroup<IMonitorFormModel>({
      ids: new FormControl<number[]>([]),
      names: new FormControl<string[]>([]),
      isFailed: new FormControl<boolean>(true),
      isPassed: new FormControl<boolean>(true),
    });
    const filters = this.filtersService.getMonitorFilters();
    if (filters) this.updateMonitorForm(filters);
  }

  initIdsSelectOptions(): void {
    this.idsSelectOptions = this.students.map(student => student.id);
  }

  initNamesSelectOptions(): void {
    const namesListWithDuplicates = this.students.map(student =>
      student.name?.toLowerCase(),
    );
    this.namesSelectOptions = ArrayUtilsService.removeDuplicates(
      namesListWithDuplicates,
    );
  }

  subscribeMonitorFormChanges(): void {
    this.monitorForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        startWith(this.monitorForm.value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(monitorFilters => {
        this.filtersService.setMonitorFilters(monitorFilters);
        this.setFilterOptions.emit(
          monitorFilters as IMonitorFilterOptionsModel,
        );
      });
  }

  updateMonitorForm(filters: Partial<IMonitorFiltersModel>): void {
    this.monitorForm.controls.ids.patchValue(filters.ids);
    this.monitorForm.controls.names.patchValue(filters.names);
    this.monitorForm.controls.isFailed.patchValue(filters.isFailed);
    this.monitorForm.controls.isPassed.patchValue(filters.isPassed);
  }

  resetForm(event: Event): void {
    event.preventDefault();
    this.monitorForm.reset();
    this.monitorForm.controls.isFailed.patchValue(true);
    this.monitorForm.controls.isPassed.patchValue(true);
  }
}
