import { Component, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input-multiselect',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    MatSelectTrigger,
  ],
  templateUrl: './form-input-multiselect.component.html',
  styleUrl: './form-input-multiselect.component.css',
})
export class FormInputMultiselectComponent {
  @Input({ required: true }) optionList: string[] | number[];
  @Input({ required: true }) optionControl: FormControl<string[] | number[]>;
  @Input({ required: true }) placeHolder: string;
}
