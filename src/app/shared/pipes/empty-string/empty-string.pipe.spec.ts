import { EmptyStringPipe } from './empty-string.pipe';

describe('EmptyStringPipe', () => {
  const pipe = new EmptyStringPipe();
  const defaultValue = 'N/A';
  const customDefaultValue = '-';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform an empty string', () => {
    expect(pipe.transform(null)).toEqual(defaultValue);
    expect(pipe.transform(undefined)).toEqual(defaultValue);
    expect(pipe.transform('')).toEqual(defaultValue);
  });

  it('should transform text as text without changes', () => {
    expect(pipe.transform('test')).toEqual('test');
    expect(pipe.transform('test!')).toEqual('test!');
    expect(pipe.transform(1)).toEqual('1');
    expect(pipe.transform(1.5)).toEqual('1.5');
    expect(pipe.transform(0)).toEqual('0');
  });

  it('should transform an empty string with custom default value', () => {
    expect(pipe.transform(null, customDefaultValue)).toEqual(customDefaultValue);
    expect(pipe.transform(undefined, customDefaultValue)).toEqual(customDefaultValue);
    expect(pipe.transform('', customDefaultValue)).toEqual(customDefaultValue);
  });
});
