export class ObjectUtilsService {
  /**
   * Deep cloning an object.
   * @group Methods
   * @param {T} obj - object
   * */
  static clone<T>(obj: T): T {
    return obj ? JSON.parse(JSON.stringify(obj)) : null;
  }
}
