import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardImpuestosComponent } from './dashboard-impuestos.component';

describe('DashboardImpuestosComponent', () => {
  let component: DashboardImpuestosComponent;
  let fixture: ComponentFixture<DashboardImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardImpuestosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
