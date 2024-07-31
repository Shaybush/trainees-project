import {FormControl} from "@angular/forms";

export interface IMonitorForm {
  ids: FormControl<number[]>;
  names: FormControl<string[]>;
  isPassed: FormControl<boolean>;
  isFailed: FormControl<boolean>;
}

export interface IMonitorFilterOptionsModel {
  ids: number[];
  names: string[];
  isPassed: boolean;
  isFailed: boolean;
}

export interface IMonitorTableDataModel {
  id: string;
  name: string;
  average: number;
  exams: number
}
