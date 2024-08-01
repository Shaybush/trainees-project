import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormInputMultiselectComponent
} from "../../../../shared/components/form/form-input-multiselect/form-input-multiselect.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IAnalysisFilterOptionsModel, IAnalysisFormModel} from "../../models/i-analysis-view.model";
import {IStudentElementModel} from "../../../../shared/models/i-student-data.model";
import {StudentsHttpDummyDataService} from "../../../../shared/services/students-http-dummy-data.service";
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
  students: IStudentElementModel[];
  idsSelectOptions: number[];
  subjectsSelectOptions: string[];

  constructor(private studentsDataService: StudentsHttpDummyDataService) {
  }

  ngOnInit(): void {
    this.initAnalysisForm();
    this.studentsDataService.getStudents().subscribe(students => {
      this.students = students;
    })
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
    this.idsSelectOptions = this.students.map(student => student.id)
  }

  initSubjectsSelectOptions(): void {
    const subjectsListWithDuplicates = this.students.map(student => student.subject?.toLowerCase());
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
