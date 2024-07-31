import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  FormInputMultiselectComponent
} from "../../../../shared/components/form/form-input-multiselect/form-input-multiselect.component";
import {IMonitorFilterOptionsModel, IMonitorForm} from "../../models/i-monitor-view.model";
import {StudentsDataService} from "../../../../shared/services/students-data.service";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {ArrayUtilsService} from "../../../../shared/services/util/arrays-utils.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-monitor-form-header',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, FormInputMultiselectComponent, MatCheckbox],
  templateUrl: './monitor-form-header.component.html',
  styleUrl: './monitor-form-header.component.css'
})
export class MonitorFormHeaderComponent implements OnInit {
  @Output() setFilterOptions: EventEmitter<IMonitorFilterOptionsModel> = new EventEmitter<IMonitorFilterOptionsModel>();

  monitorForm: FormGroup<IMonitorForm>;
  students_list: IStudentElementModel[];
  idsSelectOptions: number[];
  namesSelectOptions: string[];

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.initMonitorForm();
    this.students_list = this.studentsDataService.getStudentsValue();
    this.initIdsSelectOptions();
    this.initNamesSelectOptions();
    this.subscribeMonitorFormChanges();
  }

  initMonitorForm(): void {
    this.monitorForm = new FormGroup<IMonitorForm>({
      ids: new FormControl<number[]>([]),
      names: new FormControl<string[]>([]),
      isFailed: new FormControl<boolean>(false),
      isPassed: new FormControl<boolean>(false),
    })
  }

  initIdsSelectOptions(): void {
    this.idsSelectOptions = this.students_list.map(student => student.id)
  }

  initNamesSelectOptions(): void {
    const namesListWithDuplicates = this.students_list.map(student => student.name?.toLowerCase());
    this.namesSelectOptions = ArrayUtilsService.removeDuplicates(namesListWithDuplicates);
  }

  subscribeMonitorFormChanges(): void {
    this.monitorForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((monitorFilters) => {
        this.setFilterOptions.emit(monitorFilters as IMonitorFilterOptionsModel);
    })
  }

  monitorFormSubmit(): void {}
}
