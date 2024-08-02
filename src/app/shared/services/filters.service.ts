import { Injectable } from '@angular/core';
import {IAnalysisFiltersModel, IMonitorFiltersModel} from "../models/i-filter.model";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private analysisFilters: Partial<IAnalysisFiltersModel>;
  private monitorFilters: Partial<IMonitorFiltersModel>;
  dataSearchFilter: string;

  setAnalysisFilters(analysisFilters: Partial<IAnalysisFiltersModel>): void{
    this.analysisFilters = analysisFilters;
  }

  getAnalysisFilters(): Partial<IAnalysisFiltersModel>{
    return this.analysisFilters;
  }

  setMonitorFilters(monitorFilters: Partial<IMonitorFiltersModel>): void{
    this.monitorFilters = monitorFilters;
  }

  getMonitorFilters(): Partial<IMonitorFiltersModel>{
    return this.monitorFilters
  }

  setDataSearchFilter(filter: string): void {
    this.dataSearchFilter = filter;
  }

  getDataSearchFilter(): string {
    return this.dataSearchFilter;
  }
}
