import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { EChartsOption } from 'echarts';
import {
  IAnalysisChartDataModel,
  IChartDataValuesModel,
} from '../../models/i-analysis-view.model';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-analysis-chart-bar',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './analysis-chart-bar.component.html',
  styleUrl: './analysis-chart-bar.component.css',
})
export class AnalysisChartBarComponent {
  @Input({ required: true })
  set chartData(value: IAnalysisChartDataModel[]) {
    this.initChartOptions(value);
  }

  @Input()
  set hideData(value: boolean) {
    this.isLoading = true;
    // todo - improve later
    setTimeout(() => {
      this.isLoading = false;
      this._hideData = value;
    });
  }
  get hideData(): boolean {
    return this._hideData;
  }

  isLoading?: boolean;
  private _hideData: boolean;
  chartOption: EChartsOption;

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
