import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStudentAverageChartBarComponent } from './analysis-student-average-chart-bar.component';

describe('AnalysisChartOverTimeComponent', () => {
  let component: AnalysisStudentAverageChartBarComponent;
  let fixture: ComponentFixture<AnalysisStudentAverageChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisStudentAverageChartBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisStudentAverageChartBarComponent);
    component = fixture.componentInstance;
    component.chartData = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
