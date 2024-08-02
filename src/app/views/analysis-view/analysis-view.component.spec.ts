import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisViewComponent } from './analysis-view.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AnalysisViewComponent', () => {
  let component: AnalysisViewComponent;
  let fixture: ComponentFixture<AnalysisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisViewComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
