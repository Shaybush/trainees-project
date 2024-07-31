import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IStudentElementModel} from "../models/i-student-data.model";
import {StudentsDummyData} from "../../core/config/student-dummy-data.config";
import {LocalStorageUtilsService} from "./util/local-storage-utils.service";
import {ELocalKey} from "../enums/e-local-key.enum";

@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {
  private students$: BehaviorSubject<IStudentElementModel[]> = new BehaviorSubject<IStudentElementModel[]>([]);

  constructor() {
    // check if there is data in local storage
    const student_data = LocalStorageUtilsService.getSessionValueAsObject(ELocalKey.students_ar) as IStudentElementModel[] || StudentsDummyData;
    this.students$.next(student_data);
  }

  /* search query start */
  getStudents(): Observable<IStudentElementModel[]> {
    return this.students$.asObservable();
  }

  setStudents(students: IStudentElementModel[]): void {
    this.students$.next(students);
    LocalStorageUtilsService.setLocalStorageObjectAsValue(ELocalKey.students_ar, students)
  }

  addStudent(student: IStudentElementModel): void {
    const currentStudents = this.students$.getValue();
    const updatedStudents = [student, ...currentStudents];
    this.setStudents(updatedStudents);
  }
}
