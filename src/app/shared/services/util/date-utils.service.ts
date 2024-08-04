import { IStudentElementModel } from '../../models/i-student-data.model';

/**
 * Utility methods for dates.
 */
export class DateUtilsService {
  /**
   * Converts date into a string.
   * */
  // static dateToString(date: Date): IStudentElementModel['date'] {
  //   if (!date) {
  //     return '' as any;
  //   } else {
  //     const year = date.getFullYear();
  //     const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //     const day = ('0' + date.getDate()).slice(-2);
  //     return `${year}-${month}-${day}`;
  //   }
  // }
  /**
   *  Convert from string to unix time (date)
   *  */
  // static dateToUnixTime(dateString: string): number {
  //   const date = new Date(dateString);
  //   return Math.floor(date.getTime());
  // }
}
