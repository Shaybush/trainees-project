import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartStudentAverageComponent } from './analysis-chart-student-average.component';

describe('AnalysisChartStudentAverageComponent', () => {
  let component: AnalysisChartStudentAverageComponent;
  let fixture: ComponentFixture<AnalysisChartStudentAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartStudentAverageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisChartStudentAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
