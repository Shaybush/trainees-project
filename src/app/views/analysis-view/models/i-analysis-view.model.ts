import { FormControl } from '@angular/forms';

export interface IAnalysisFilterOptionsModel {
  ids: number[];
  subjects: string[];
}

export interface IAnalysisFormModel {
  ids: FormControl<number[]>;
  subjects: FormControl<string[]>;
}

export interface IAnalysisChartDataModel {
  label: string;
  value: number;
}

export interface IChartsInfoModel {
  id: number;
  name: string;
  data?: IAnalysisChartDataModel[];
}

export interface IFilterOverTimeValueModel {
  name: string;
  totalGrades: number;
  exams: number;
}

export interface IChartDataValuesModel {
  value: number;
  itemStyle: {
    color: string;
  };
}

export interface IAnalysisChartLineStudentExamsWithIdModel {
  id: string;
  exams: IAnalysisChartLineStudentExams[];
}

export interface IAnalysisChartLineStudentExams {
  date: `${number}-${number}-${number}`;
  grade: number;
}
