import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IDataDetailsFormModel} from "../../models/i-data-details-form.model";
import {MatError, MatFormField} from "@angular/material/form-field";
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
    MatButton,
    MatError
  ],
  templateUrl: './data-details-card.component.html',
  styleUrl: './data-details-card.component.css'
})
export class DataDetailsCardComponent implements OnInit {
  @Input() chosenStudent: IStudentElementModel | null;
  @Output() closeDetailsCard: EventEmitter<void> = new EventEmitter<void>();

  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  datePattern: string = "^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";

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
      // todo - check if year is valid not bigger then current date
      date_joined: new FormControl<Date | number | string>('', [Validators.required, Validators.pattern(this.datePattern)]),
      city: new FormControl<string>('', [Validators.required]),
      address: new FormControl<string>('', [Validators.required]),
      grade: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
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
    console.log(this.dataDetailsForm.value)
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
    const random_id = new Date().getTime();
    const new_student: IStudentElementModel = {...this.dataDetailsForm.value, id: random_id} as IStudentElementModel;
    this.studentsDataService.addStudent(new_student);
    this.closeDetailsCard.emit();
  }
}
