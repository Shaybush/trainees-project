import {Component, Input, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import {IAnalysisChartDataModel, IChartDataValuesModel} from "../../models/i-analysis-view.model";
import {NgxEchartsDirective} from "ngx-echarts";

@Component({
  selector: 'app-analysis-chart-over-time',
  standalone: true,
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './analysis-chart.component.html',
  styleUrl: './analysis-chart.component.css'
})

export class AnalysisChartComponent implements OnInit {
  @Input({ required: true }) chartData: IAnalysisChartDataModel[];
  @Input() showData: boolean = false;

  chartOption: EChartsOption;

  ngOnInit(): void {
    console.log(this.showData)
    if(this.showData) this.initChartOptions();
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
        color: this.getRandomColor()
      }
    }))
  }

  private getRandomColor(): string {
    const hexCode = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    return "#" + hexCode.padStart(6, '0');
  }
}
