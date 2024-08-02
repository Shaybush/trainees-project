import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudentElementModel } from '../models/i-student-data.model';
import { StudentsDummyData } from '../../core/config/student-dummy-data.config';
import { LocalStorageUtilsService } from './util/local-storage-utils.service';
import { ELocalKey } from '../enums/e-local-key.enum';
import { MatchMode } from '../../core/services/filter.type';
import { TableFiltersServiceService } from '../../core/services/filter.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsHttpDummyDataService {
  constructor(private filterService: TableFiltersServiceService) {}
  private InitialStudents: IStudentElementModel[] =
    (LocalStorageUtilsService.getSessionValueAsObject(
      ELocalKey.students_ar,
    ) as IStudentElementModel[]) || StudentsDummyData;
  private currentStudents: IStudentElementModel[] = this.InitialStudents;

  /* search query start */
  public getStudents(filter?: string): Observable<IStudentElementModel[]> {
    if (!filter) {
      return of(this.InitialStudents);
    }
    const [filed, valueWithOperator] = filter?.trim()?.split(':');
    const isGraterOrLess = ['>', '<']?.includes(
      valueWithOperator?.trim()?.at(0),
    );
    this.currentStudents = this.filterService.filter<IStudentElementModel>(
      this.InitialStudents,
      {
        filters: [
          {
            [filed?.toLowerCase()]: {
              matchMode: isGraterOrLess
                ? valueWithOperator?.trim()?.at(0) === '>'
                  ? MatchMode.GreaterThan
                  : MatchMode.LessThan
                : MatchMode.StartsWith,
              value: isGraterOrLess
                ? valueWithOperator?.trim()?.slice(1)
                : valueWithOperator?.trim(),
            },
          },
        ],
        // default pagination front filters and not server filters
        pageNum: 0,
        pageSize: Number.MAX_VALUE,
      },
    ).data;
    return of(this.currentStudents);
  }

  private updateStudentsCollection(students: IStudentElementModel[]): void {
    LocalStorageUtilsService.setLocalStorageObjectAsValue(
      ELocalKey.students_ar,
      students,
    );
  }

  putStudent(
    student: Partial<IStudentElementModel>,
  ): Observable<IStudentElementModel[]> {
    const userToEdit = this.currentStudents.findIndex(i => i.id === student.id);
    Object.keys(student).reduce((acc, key) => {
      if (this.currentStudents[userToEdit].hasOwnProperty(key)) {
        this.currentStudents[userToEdit][key] = student[key];
      }
      return acc;
    }, {});
    this.updateStudentsCollection(this.currentStudents);
    return of(this.currentStudents);
  }

  public postStudent(
    student: Omit<IStudentElementModel, 'id'>,
  ): Observable<IStudentElementModel[]> {
    const newStudent: IStudentElementModel = {
      ...student,
      id: this.currentStudents.sort((a, b) => a.id - b.id)?.at(-1).id + 1,
    } as IStudentElementModel;
    this.currentStudents.push(newStudent);
    this.updateStudentsCollection(this.currentStudents);
    return of(this.currentStudents);
  }

  public deleteStudent(
    student: IStudentElementModel,
  ): Observable<IStudentElementModel[]> {
    this.currentStudents = this.currentStudents.filter(
      i => i?.id !== student.id,
    );
    this.updateStudentsCollection(this.currentStudents);
    return of(this.currentStudents);
  }
}
