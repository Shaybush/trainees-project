export class ObjectUtilsService {
  /**
   * Deep cloning an object.
   * @group Methods
   * @param {any} obj - object
   * */
  static clone(obj: any): any {
    return obj ? JSON.parse(JSON.stringify(obj)) : null;
  }
}
