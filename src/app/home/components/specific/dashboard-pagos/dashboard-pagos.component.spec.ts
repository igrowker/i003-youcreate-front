import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPagosComponent } from './dashboard-pagos.component';

describe('DashboardPagosComponent', () => {
  let component: DashboardPagosComponent;
  let fixture: ComponentFixture<DashboardPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
