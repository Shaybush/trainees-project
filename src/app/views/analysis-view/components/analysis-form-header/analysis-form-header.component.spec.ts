import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFormHeaderComponent } from './analysis-form-header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AnalysisFormHeaderComponent', () => {
  let component: AnalysisFormHeaderComponent;
  let fixture: ComponentFixture<AnalysisFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisFormHeaderComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
