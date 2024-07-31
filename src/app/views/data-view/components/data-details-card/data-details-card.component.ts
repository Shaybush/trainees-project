import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IDataDetailsFormModel} from "../../models/i-data-details-form.model";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {DateUtilsService} from "../../../../shared/services/util/date-utils.service";
import {MatButton} from "@angular/material/button";
import {StudentsDataService} from "../../../../shared/services/students-data.service";

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
    MatButton
  ],
  templateUrl: './data-details-card.component.html',
  styleUrl: './data-details-card.component.css'
})
export class DataDetailsCardComponent implements OnInit {
  @Input() chosenStudent: IStudentElementModel | null;

  @Output() closeDetailsCard: EventEmitter<void> = new EventEmitter<void>();
  dataDetailsForm: FormGroup<IDataDetailsFormModel>

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.initDataDetailsForm();
  }

  initDataDetailsForm(): void {
    this.dataDetailsForm = new FormGroup({
      id: new FormControl<number>({ value: null, disabled: true }),
      name: new FormControl<string>('', [Validators.required]),
      date_joined: new FormControl<Date | number | string>('', [Validators.required]),
      city: new FormControl<string>('', [Validators.required]),
      address: new FormControl<string>('', [Validators.required]),
      grade: new FormControl<number>(0, [Validators.required]),
      email: new FormControl<string>('', [Validators.required]),
      country: new FormControl<string>('', [Validators.required]),
      zip: new FormControl<number>(null, [Validators.required]),
      subject: new FormControl<string>('', [Validators.required]),
    });

    if(this.chosenStudent) this.updateDataDetailsForm()
  }

  updateDataDetailsForm(): void {
    const date_string = DateUtilsService.dateToString(new Date(this.chosenStudent.date_joined));
    this.dataDetailsForm.patchValue({
      id: this.chosenStudent.id,
      name: this.chosenStudent.name,
      date_joined: date_string,
      city: this.chosenStudent.city,
      address: this.chosenStudent.address,
      grade: this.chosenStudent.grade,
      email: this.chosenStudent.email,
      country: this.chosenStudent.country,
      zip: this.chosenStudent.zip,
      subject: this.chosenStudent.subject
    });
  }

  dataDetailsSubmit(): void {
    if(this.chosenStudent) {
      this.editUser();
      return;
    }
    this.newUser();
  }

  editUser(): void {
    const edited_data: IStudentElementModel = {...this.dataDetailsForm.value,
      id: this.chosenStudent.id,
      grade: Number(this.dataDetailsForm.controls.grade.value)} as IStudentElementModel;
    const all_students = this.studentsDataService.getStudentsValue();
    const filteredStudents = all_students.map((student: IStudentElementModel) => {
      if(student.id === edited_data.id) return {...edited_data, date_joined: DateUtilsService.dateToUnixTime(edited_data.date_joined as string)};
      return student;
    })
    this.studentsDataService.setStudents(filteredStudents);
    this.closeDetailsCard.emit();
  }

  newUser(): void {
    const random_id = this.studentsDataService.getNextIndex();
    const new_student: IStudentElementModel = {...this.dataDetailsForm.value, id: random_id} as IStudentElementModel;
    this.studentsDataService.addStudent(new_student);
    this.closeDetailsCard.emit();
  }
}
