import { EmptyStringPipe } from './empty-string.pipe';

describe('EmptyStringPipe', () => {
  const pipe = new EmptyStringPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform text as text without changes', () => {
    expect(pipe.transform('test')).toEqual('test');
    expect(pipe.transform('test!')).toEqual('test!');
    expect(pipe.transform(1)).toEqual('1');
    expect(pipe.transform(1.5)).toEqual('1.5');
    expect(pipe.transform(0)).toEqual('0');
  });
});
