import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './data-header.component.html',
  styleUrl: './data-header.component.css'
})
export class DataHeaderComponent {
  @Output() applyFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() openDetailsCard: EventEmitter<IStudentElementModel | null> = new EventEmitter<IStudentElementModel | null>();

  addNewStudent(): void {
    this.openDetailsCard.emit(null);
  }
}
