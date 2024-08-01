import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormInputMultiselectComponent
} from "../../../../shared/components/form/form-input-multiselect/form-input-multiselect.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IAnalysisFilterOptionsModel, IAnalysisFormModel} from "../../models/i-analysis-view.model";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {StudentsDataService} from "../../../../shared/services/students-data.service";
import {ArrayUtilsService} from "../../../../shared/services/util/arrays-utils.service";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-analysis-form-header',
  standalone: true,
  imports: [
    FormInputMultiselectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './analysis-form-header.component.html',
  styleUrl: './analysis-form-header.component.css'
})
export class AnalysisFormHeaderComponent implements OnInit {
  @Output() setFilterOptions: EventEmitter<IAnalysisFilterOptionsModel> = new EventEmitter<IAnalysisFilterOptionsModel>();

  analysisForm: FormGroup<IAnalysisFormModel>;
  students_list: IStudentElementModel[];
  idsSelectOptions: number[];
  subjectsSelectOptions: string[];

  constructor(private studentsDataService: StudentsDataService) {
  }

  ngOnInit(): void {
    this.initAnalysisForm();
    this.students_list = this.studentsDataService.getStudentsValue();
    this.initIdsSelectOptions();
    this.initSubjectsSelectOptions();
    this.subscribeAnalysisFormChanges();
  }

  initAnalysisForm(): void {
    this.analysisForm = new FormGroup<IAnalysisFormModel>({
      ids: new FormControl<number[]>([]),
      subjects: new FormControl<string[]>([]),
    })
  }

  initIdsSelectOptions(): void {
    this.idsSelectOptions = this.students_list.map(student => student.id)
  }

  initSubjectsSelectOptions(): void {
    const subjectsListWithDuplicates = this.students_list.map(student => student.subject?.toLowerCase());
    this.subjectsSelectOptions = ArrayUtilsService.removeDuplicates(subjectsListWithDuplicates);
  }

  subscribeAnalysisFormChanges(): void {
    this.analysisForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((analysisFilters) => {
        this.setFilterOptions.emit(analysisFilters as IAnalysisFilterOptionsModel);
      })
  }
}
