import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartComponent } from './analysis-chart.component';

describe('AnalysisChartOverTimeComponent', () => {
  let component: AnalysisChartComponent;
  let fixture: ComponentFixture<AnalysisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
