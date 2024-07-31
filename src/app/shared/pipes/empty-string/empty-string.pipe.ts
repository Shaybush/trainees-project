import { Pipe, PipeTransform } from '@angular/core';
import { emptyStringStr } from './str/empty-string.str';

/**
 * Transforms empty string to a default value to be displayed.
 * '' -> 'N/A'
 * @group Pipes
 */
@Pipe({
  name: 'emptyString',
  standalone: true,
})
export class EmptyStringPipe implements PipeTransform {
  /**
   * @param {string | number} str - string or number which can be empty
   * @param {string} defaultValue - what value should be displayed when empty
   */
  transform(str: string | number, defaultValue: string = emptyStringStr.emptyStringLabel): string {
    switch (typeof str) {
      case 'number':
        return str !== undefined && str !== null ? str.toString() : defaultValue;
      case 'string':
        return !!str && !!str.trim() ? str : defaultValue;
      default:
        return defaultValue;
    }
  }
}
