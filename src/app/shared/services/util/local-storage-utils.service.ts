import { ELocalKey } from '../../enums/e-local-key.enum';

/**
 * Utility methods for browser local storage.
 * @group Services
 */
export class LocalStorageUtilsService {
  private static readonly prefix = 'bank';

  /**
   * Takes enum key and returns the full key based on a child app.
   * */
  private static getFullLocalStorageKey(key: ELocalKey): string {
    return `${LocalStorageUtilsService.prefix}__${key}`;
  }

  /**
   * Get value stored in local storage as an object
   * */
  static getSessionValueAsObject<T>(key: ELocalKey): T | null {
    try {
      const fullKey = this.getFullLocalStorageKey(key);
      const value = localStorage.getItem(fullKey) || '';
      return JSON.parse(value);
    } catch (error) {
      console.log(`%c ${error} `, 'background: #222; color: #bada55');
      return null;
    }
  }

  /**
   * Sets object value to storage.
   * */
  static setLocalStorageObjectAsValue(key: any, value: any): void {
    const valueAsString = JSON.stringify(value);
    const fullKey = this.getFullLocalStorageKey(key);
    localStorage.setItem(fullKey, valueAsString);
  }

  /**
   * Removes value from local storage.
   * */
  static removeLocalStorageValue(key: ELocalKey): void {
    const fullKey = this.getFullLocalStorageKey(key);
    localStorage.removeItem(fullKey);
  }

  /**
   * Remove all values related to the app from local storage.
   * */
  static cleanLocalStorageValues(): void {
    Object.keys(ELocalKey).forEach(key =>
      this.removeLocalStorageValue(<ELocalKey>key),
    );
  }
}
