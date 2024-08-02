import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartBarComponent } from './analysis-chart-bar.component';

describe('AnalysisChartOverTimeComponent', () => {
  let component: AnalysisChartBarComponent;
  let fixture: ComponentFixture<AnalysisChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisChartBarComponent);
    component = fixture.componentInstance;
    component.chartData = []

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
