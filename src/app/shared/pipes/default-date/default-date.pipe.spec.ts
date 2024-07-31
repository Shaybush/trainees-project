import { DefaultDatePipe } from './default-date.pipe';

describe('DefaultDatePipe', () => {
  const pipe = new DefaultDatePipe('en-US');

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return date string with default format', () => {
    expect(pipe.transform(new Date(2020, 0, 1))).toEqual('Jan 1, 2020');
  });

  it('should transform time string with default format', () => {
    expect(pipe.transform(new Date(2020, 0, 1, 13, 0, 0), 'time')).toEqual('1:00:00 PM');
  });

  it('should transform timestamp string with default format', () => {
    expect(pipe.transform(new Date(2020, 0, 1, 13, 0, 0), 'timestamp')).toEqual('Jan 1, 2020, 1:00:00 PM');
  });

  it('should transform time and timestamp hide seconds', () => {
    expect(pipe.transform(new Date(2020, 0, 1, 13, 0, 0), 'time', false)).toEqual('1:00 PM');
    expect(pipe.transform(new Date(2020, 0, 1, 13, 0, 0), 'timestamp', false)).toEqual('Jan 1, 2020, 1:00 PM');
  });

  it('should handle error transforming date - invalid string', () => {
    spyOn(console, 'error');
    expect(pipe.transform('test')).toBe('');
    expect(console.error).toHaveBeenCalled();
  });
});
