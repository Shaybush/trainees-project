import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartOverTimeComponent } from './analysis-chart-over-time.component';

describe('AnalysisChartOverTimeComponent', () => {
  let component: AnalysisChartOverTimeComponent;
  let fixture: ComponentFixture<AnalysisChartOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisChartOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
