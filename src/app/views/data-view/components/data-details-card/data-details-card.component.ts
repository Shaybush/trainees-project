import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IStudentElementModel } from '../../../../shared/models/i-student-data.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IDataDetailsFormModel } from '../../models/i-data-details-form.model';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { DateUtilsService } from '../../../../shared/services/util/date-utils.service';
import { MatButton } from '@angular/material/button';
import { StudentsHttpDummyDataService } from '../../../../shared/services/students-http-dummy-data.service';
import { take } from 'rxjs';
import {validYear} from "./custom-validators/custom-validators";

@Component({
  selector: 'app-data-details-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    MatError,
  ],
  templateUrl: './data-details-card.component.html',
  styleUrl: './data-details-card.component.css',
})
export class DataDetailsCardComponent implements OnInit {
  @Input() chosenStudent: IStudentElementModel | null;
  @Output() closeDetailsCard: EventEmitter<void> = new EventEmitter<void>();
  @Output() setData: EventEmitter<IStudentElementModel[]> = new EventEmitter<
    IStudentElementModel[]
  >();

  datePattern: string = '^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$';
  dataDetailsForm: FormGroup<IDataDetailsFormModel>;

  constructor(private studentsDataService: StudentsHttpDummyDataService) {}

  ngOnInit(): void {
    this.initDataDetailsForm();
  }

  initDataDetailsForm(): void {
    this.dataDetailsForm = new FormGroup({
      id: new FormControl<IStudentElementModel['id']>({
        value: null,
        disabled: true,
      }),
      name: new FormControl<IStudentElementModel['name']>('', [
        Validators.required,
      ]),
      date: new FormControl<IStudentElementModel['date']>(null, [
        Validators.required,
        Validators.pattern(this.datePattern),
        validYear()
      ]),
      city: new FormControl<IStudentElementModel['city']>('', [
        Validators.required,
      ]),
      address: new FormControl<IStudentElementModel['address']>('', [
        Validators.required,
      ]),
      grade: new FormControl<IStudentElementModel['grade']>(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      email: new FormControl<IStudentElementModel['email']>('', [
        Validators.required,
        Validators.email,
      ]),
      country: new FormControl<IStudentElementModel['country']>('', [
        Validators.required,
      ]),
      zip: new FormControl<IStudentElementModel['zip']>(null, [
        Validators.required,
      ]),
      subject: new FormControl<IStudentElementModel['subject']>('', [
        Validators.required,
      ]),
    });

    if (this.chosenStudent) this.updateDataDetailsForm();
  }

  updateDataDetailsForm(): void {
    this.dataDetailsForm.patchValue({
      id: this.chosenStudent.id,
      name: this.chosenStudent.name,
      date: this.chosenStudent.date,
      city: this.chosenStudent.city,
      address: this.chosenStudent.address,
      grade: this.chosenStudent.grade,
      email: this.chosenStudent.email,
      country: this.chosenStudent.country,
      zip: this.chosenStudent.zip,
      subject: this.chosenStudent.subject,
    });
  }

  dataDetailsSubmit(): void {
    if (this.chosenStudent) {
      this.editUser();
      return;
    }
    this.newUser();
  }

  editUser(): void {
    this.dataDetailsForm.controls.id.enable();
    this.studentsDataService
      .putStudent(this.dataDetailsForm.value)
      .pipe(take(1))
      .subscribe(students => {
        this.closeDetailsCard.emit();
        this.setData.emit(students);
        this.dataDetailsForm.controls.id.disable();
      });
  }

  newUser(): void {
    this.studentsDataService
      .postStudent(this.dataDetailsForm.value as IStudentElementModel)
      .pipe(take(1))
      .subscribe(students => {
        this.closeDetailsCard.emit();
        this.setData.emit(students);
      });
  }
}
