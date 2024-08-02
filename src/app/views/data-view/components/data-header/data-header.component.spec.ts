import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHeaderComponent } from './data-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DataHeaderComponent', () => {
  let component: DataHeaderComponent;
  let fixture: ComponentFixture<DataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataHeaderComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
