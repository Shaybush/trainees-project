export class StringUtilsService {
  static generateGUIDFromUserName(userName: string): string {
    function hashCode(str: string): number {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
      }
      return hash;
    }

    function padZeroes(num: number, size: number): string {
      let s = num.toString(16);
      while (s.length < size) {
        s = '0' + s;
      }
      return s;
    }

    const hash = hashCode(userName);

    // Generate parts of the GUID
    const part1 = padZeroes((hash & 0xffffffff) >>> 0, 8);
    const part2 = padZeroes((hash & 0xffff) >>> 0, 4);
    const part3 = padZeroes((hash & 0x0fff) >>> 0, 4);
    const part4 = padZeroes((hash & 0xffff) >>> 0, 4);
    const part5 = padZeroes((hash & 0xffffffffffff) >>> 0, 12);

    // Combine parts into GUID format
    const guid = `${part1}-${part2}-${part3}-${part4}-${part5}`;
    return guid;
  }
}
