import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { IStudentElementModel } from '../../../../shared/models/i-student-data.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDataHeaderFormModel } from '../../models/i-data-details-form.model';
import { FiltersService } from '../../../../shared/services/filters.service';
import {debounceTime, distinctUntilChanged, startWith, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, MatButton, ReactiveFormsModule],
  templateUrl: './data-header.component.html',
  styleUrl: './data-header.component.css',
})
export class DataHeaderComponent implements OnInit, OnDestroy {
  dataHeaderForm: FormGroup<IDataHeaderFormModel>;
  @Output() applyFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() openDetailsCard: EventEmitter<IStudentElementModel | null> =
    new EventEmitter<IStudentElementModel | null>();

  // unsubscribe
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    this.initDataHeaderForm();
    this.subscribeDataFormChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initDataHeaderForm(): void {
    this.dataHeaderForm = new FormGroup<IDataHeaderFormModel>({
      search: new FormControl<string>(''),
    });

    const filter = this.filtersService.getDataSearchFilter();
    if (filter) this.updateAnalysisForm(filter);
  }

  updateAnalysisForm(filter: string): void {
    this.dataHeaderForm.controls.search.patchValue(filter);
  }

  subscribeDataFormChanges(): void {
    this.dataHeaderForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        startWith(this.dataHeaderForm.value),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(filter => {
        this.filtersService.setDataSearchFilter(filter.search);
        this.applyFilter.emit(filter.search);
      });
  }

  addNewStudent(): void {
    this.openDetailsCard.emit(null);
  }
}
