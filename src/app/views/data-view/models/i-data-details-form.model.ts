import {FormControl} from "@angular/forms";
import {IStudentElementModel} from "../../../shared/models/i-student-data.model";

export interface IDataDetailsFormModel {
  id: FormControl<IStudentElementModel['id']>;
  name: FormControl<IStudentElementModel['name']>;
  grade: FormControl<IStudentElementModel['grade']>;
  subject: FormControl<IStudentElementModel['subject']>;
  email: FormControl<IStudentElementModel['email']>;
  date: FormControl<IStudentElementModel['date']>;
  address: FormControl<IStudentElementModel['address']>;
  city: FormControl<IStudentElementModel['city']>;
  country: FormControl<IStudentElementModel['country']>;
  zip: FormControl<IStudentElementModel['zip']>;
}

export interface IDataHeaderFormModel {
  search: FormControl<string>;
}
