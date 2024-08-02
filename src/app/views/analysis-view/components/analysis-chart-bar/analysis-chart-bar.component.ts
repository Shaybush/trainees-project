import { Component, Input, OnInit } from '@angular/core';
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
export class AnalysisChartBarComponent implements OnInit {
  @Input({ required: true }) chartData: IAnalysisChartDataModel[];
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

  ngOnInit(): void {
    this.initChartOptions();
  }

  private initChartOptions(): void {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.chartData.map(data => data.label),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.mapChartValues(),
          type: 'bar',
        },
      ],
    };
  }

  private mapChartValues(): IChartDataValuesModel[] {
    return this.chartData.map(data => ({
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
