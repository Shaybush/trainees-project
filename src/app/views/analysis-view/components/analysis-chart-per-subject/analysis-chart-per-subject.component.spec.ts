import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartPerSubjectComponent } from './analysis-chart-per-subject.component';

describe('AnalysisChartPerSubjectComponent', () => {
  let component: AnalysisChartPerSubjectComponent;
  let fixture: ComponentFixture<AnalysisChartPerSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartPerSubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisChartPerSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
