import {FormControl} from "@angular/forms";

export interface IDataDetailsFormModel {
  id: FormControl<number | null>;
  name: FormControl<string>;
  grade: FormControl<number>;
  subject: FormControl<string>;
  email: FormControl<string>;
  date_joined: FormControl<Date | number>;
  address: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  zip: FormControl<number | null>;
}
