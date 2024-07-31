import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IDataDetailsFormModel} from "../../models/i-data-details-form.model";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

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
    MatIcon
  ],
  templateUrl: './data-details-card.component.html',
  styleUrl: './data-details-card.component.css'
})
export class DataDetailsCardComponent implements OnInit {
  @Input() chosenStudent: IStudentElementModel | null;

  @Output() closeDetailsCard: EventEmitter<void> = new EventEmitter<void>();
  dataDetailsForm: FormGroup<IDataDetailsFormModel>

  ngOnInit(): void {
    this.initDataDetailsForm();
  }

  initDataDetailsForm(): void {
    this.dataDetailsForm = new FormGroup({
      id: new FormControl<number>(null),
      name: new FormControl<string>(''),
      date_joined: new FormControl<Date | number>(0),
      city: new FormControl<string>(''),
      address: new FormControl<string>(''),
      grade: new FormControl<number>(0),
      email: new FormControl<string>(''),
      country: new FormControl<string>(''),
      zip: new FormControl<number>(null),
      subject: new FormControl<string>(''),
    });

    if(this.chosenStudent) this.updateDataDetailsForm()
  }

  updateDataDetailsForm(): void {
    this.dataDetailsForm.controls.id.patchValue(this.chosenStudent.id);
    this.dataDetailsForm.controls.name.patchValue(this.chosenStudent.name);
    this.dataDetailsForm.controls.date_joined.patchValue(this.chosenStudent.date_joined);
    this.dataDetailsForm.controls.city.patchValue(this.chosenStudent.city);
    this.dataDetailsForm.controls.address.patchValue(this.chosenStudent.address);
    this.dataDetailsForm.controls.grade.patchValue(this.chosenStudent.grade);
    this.dataDetailsForm.controls.email.patchValue(this.chosenStudent.email);
    this.dataDetailsForm.controls.country.patchValue(this.chosenStudent.country);
    this.dataDetailsForm.controls.zip.patchValue(this.chosenStudent.zip);
    this.dataDetailsForm.controls.subject.patchValue(this.chosenStudent.subject);
  }

  dataDetailsSubmit(): void {
    // todo - check if it's new user or exist user
    // const student: IStudentElementModel = {id: 123222, name: 'new student', grade: 95, subject: 'algabra', email: 'shay@gmail.com', date_joined: 1722408543, address: 'bilu 58', city: 'Raanana', country: 'Israel', zip: 123 }
    // this.studentsDataService.addStudent(student)
  }
}
