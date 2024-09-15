import { IStudentElementModel } from '../../models/i-student-data.model';

export class DateUtilsService {
  static convertDateToString(date: Date): string {
    if (!date) {
      return '';
    } else {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  }

  static convertDateToUnixTime(dateString: string): number {
    const date = new Date(dateString);
    return Math.floor(date.getTime());
  }
}
