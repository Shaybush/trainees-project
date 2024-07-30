import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorFormHeaderComponent } from './monitor-form-header.component';

describe('MonitorFormHeaderComponent', () => {
  let component: MonitorFormHeaderComponent;
  let fixture: ComponentFixture<MonitorFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorFormHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
