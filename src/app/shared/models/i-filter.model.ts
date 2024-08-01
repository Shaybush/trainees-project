export interface IAnalysisFiltersModel {
  ids: number[];
  subjects: string[]
}

export interface IMonitorFiltersModel {
  ids: number[];
  names: string[];
  isFailed: boolean;
  isPassed: boolean
}
