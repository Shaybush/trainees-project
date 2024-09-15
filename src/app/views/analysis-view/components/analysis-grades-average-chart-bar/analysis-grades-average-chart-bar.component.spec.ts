import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisGradesAverageChartBarComponent } from './analysis-grades-average-chart-bar.component';

describe('AnalysisChartOverTimeComponent', () => {
  let component: AnalysisGradesAverageChartBarComponent;
  let fixture: ComponentFixture<AnalysisGradesAverageChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisGradesAverageChartBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisGradesAverageChartBarComponent);
    component = fixture.componentInstance;
    component.chartData = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
