import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailsCardComponent } from './data-details-card.component';

describe('DataDetailsCardComponent', () => {
  let component: DataDetailsCardComponent;
  let fixture: ComponentFixture<DataDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDetailsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
