/**
 * Utility methods for arrays.
 */
export class ArrayUtilsService {
  /**
   * Remove duplicates from array using Set
   * */
  static removeDuplicates<T>(array: T[]) {
    return [...new Set(array)];
  }
}
