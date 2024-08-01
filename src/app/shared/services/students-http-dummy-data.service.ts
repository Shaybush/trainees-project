import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {IStudentElementModel} from "../models/i-student-data.model";
import {StudentsDummyData} from "../../core/config/student-dummy-data.config";
import {LocalStorageUtilsService} from "./util/local-storage-utils.service";
import {ELocalKey} from "../enums/e-local-key.enum";

@Injectable({
  providedIn: 'root'
})
export class StudentsHttpDummyDataService {
  private InitialStudents: IStudentElementModel[] = LocalStorageUtilsService.getSessionValueAsObject(ELocalKey.students_ar) as IStudentElementModel[] || StudentsDummyData
  private  currentStudents: IStudentElementModel[] = this.InitialStudents;
  /* search query start */
  public getStudents(filters ?: any): Observable<IStudentElementModel[]> {

    // const filteredStudents = all_students.map((student: IStudentElementModel) => {
    //   if(student.id === edited_data.id) return {...edited_data, date_joined: DateUtilsService.dateToUnixTime(edited_data.date_joined as string)};
    //   return student;
    // })

    return !filters ? of (this.currentStudents): null ;
    // TODO: apply filter here
  }

  private updateStudentsCollection(students: IStudentElementModel[]): void {
    LocalStorageUtilsService.setLocalStorageObjectAsValue(ELocalKey.students_ar, students)
  }

  putStudent (student: Partial <IStudentElementModel>):  Observable<IStudentElementModel[]> {
    const userToEdit = this.currentStudents.findIndex(i=> i.id === student.id)
    // TODO spread by reduce js array function
    Object.keys(student).reduce((acc, key) => {
      if (this.currentStudents[userToEdit].hasOwnProperty(key)) {
        this.currentStudents[userToEdit][key]  = student[key]
      }
      return acc;
    }, {});
    this.updateStudentsCollection(this.currentStudents)
    return  of(this.currentStudents)
  }

  public postStudent(student: Omit< IStudentElementModel, 'id'>): Observable<IStudentElementModel[]> {
    const newStudent: IStudentElementModel = {...student, id: this.currentStudents.sort((a, b) => a.id - b.id)?.at(-1).id+1 } as IStudentElementModel;
    this.currentStudents.push(newStudent)
    this.updateStudentsCollection(this.currentStudents)
    return of(this.currentStudents)
  }

  public  deleteStudent (student: IStudentElementModel): Observable<IStudentElementModel[]> {
    this.currentStudents = this.currentStudents.filter(i => i?.id !== student.id)
    this.updateStudentsCollection(this.currentStudents)
    return  of(this.currentStudents)
  }


}
