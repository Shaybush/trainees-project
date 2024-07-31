/**
 * Utility methods for arrays.
 */
export class ArrayUtilsService {
  /**
   * Remove duplicates from array using Set
   * */
  static removeDuplicates(array: any[]) {
    return [...new Set(array)];
  }
}
