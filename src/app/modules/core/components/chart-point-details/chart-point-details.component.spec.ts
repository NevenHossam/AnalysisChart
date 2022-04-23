import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPointDetailsComponent } from './chart-point-details.component';

describe('ChartPointDetailsComponent', () => {
  let component: ChartPointDetailsComponent;
  let fixture: ComponentFixture<ChartPointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPointDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
