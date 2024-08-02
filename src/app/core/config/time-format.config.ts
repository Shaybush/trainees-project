// follow format - {short month} {day}, {year}, {hour}:{minutes}:{seconds} {AM/PM}
export const datePipeTimeFormatConfig: Record<
  'date' | 'time' | 'timestamp',
  string
> = Object.freeze({
  date: 'MMM d, y',
  time: 'h:mm:ss a',
  timestamp: 'MMM d, y, h:mm:ss a',
});
