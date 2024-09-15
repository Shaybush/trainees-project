import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import {
  IAnalysisChartDataModel,
  IChartDataValuesModel,
} from '../../models/i-analysis-view.model';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { ObjectUtilsService } from 'src/app/shared/services/util/object-utils.service';

@Component({
  selector: 'app-analysis-grades-average-chart-bar',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './analysis-grades-average-chart-bar.component.html',
  styleUrl: './analysis-grades-average-chart-bar.component.css',
})
export class AnalysisGradesAverageChartBarComponent {
  @Input({ required: true })
  set chartData(data: IAnalysisChartDataModel[]) {
    if (!ObjectUtilsService.isCopy(this.prevData, data))
      this.initChartOptions(data);
    this.prevData = data;
  }

  @Input()
  set hideData(data: boolean) {
    this.isLoading = true;
    // todo - improve later
    setTimeout(() => {
      this.isLoading = false;
      this._hideData = data;
    });
  }
  get hideData(): boolean {
    return this._hideData;
  }

  isLoading?: boolean;
  private _hideData: boolean;
  chartOption: EChartsOption;
  prevData: IAnalysisChartDataModel[]

  private initChartOptions(chartData: IAnalysisChartDataModel[]): void {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: chartData.map((data) => data.label),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.mapChartValues(chartData),
          type: 'bar',
        },
      ],
    };
  }

  private mapChartValues(chartData: IAnalysisChartDataModel[]): IChartDataValuesModel[] {
    return chartData?.map((data) => ({
      value: data.value,
      itemStyle: {
        color: this.getRandomColor(),
      },
    }));
  }

  private getRandomColor(): string {
    const hexCode = Math.floor(Math.random() * 0xffffff).toString(16);
    return '#' + hexCode.padStart(6, '0');
  }
}
