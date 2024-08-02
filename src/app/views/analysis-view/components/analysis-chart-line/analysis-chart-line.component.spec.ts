import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisChartLineComponent } from './analysis-chart-line.component';

describe('AnalysisChartLineComponent', () => {
  let component: AnalysisChartLineComponent;
  let fixture: ComponentFixture<AnalysisChartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisChartLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
