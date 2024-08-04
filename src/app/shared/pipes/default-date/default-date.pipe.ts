import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ObjectUtilsService } from '../../services/util/object-utils.service';
import { datePipeTimeFormatConfig } from '../../../core/config/time-format.config';

/**
 * Transforms date to a string with the default format to be displayed.
 * Date -> 'Jan 1, 2020, 1:00:00 PM'
 * @group Pipes
 */
@Pipe({
  name: 'defaultDate',
  standalone: true,
})
export class DefaultDatePipe implements PipeTransform {
  private datePipe: DatePipe;
  private readonly formatConfig = ObjectUtilsService.clone(
    datePipeTimeFormatConfig,
  );

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.datePipe = new DatePipe(this.locale);
  }

  /**
   * @param {Date | number | string} date - date to display
   * @param {'date' | 'time' | 'timestamp'} type - type of date to display
   * @param {boolean} showSeconds - a flag that shows the time with or without the seconds
   * @param {string} timezone - custom timezone
   */
  transform(
    date: Date | number | string,
    type: 'date' | 'time' | 'timestamp' = 'date',
    showSeconds: boolean = true,
    timezone?: string,
  ): string {
    const format = this.formatConfig[type];
    const dateFormatWithOrWithoutSeconds = showSeconds
      ? format
      : format.replace(':ss', '');

    try {
      return (
        this.datePipe.transform(
          date,
          dateFormatWithOrWithoutSeconds,
          timezone,
        ) || ''
      );
    } catch (error) {
      console.error('Error occurred while transforming date:', error);
      return '';
    }
  }
}
