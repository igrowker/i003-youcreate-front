import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoIngresosComponent } from './grafico-ingresos.component';

describe('GraficoIngresosComponent', () => {
  let component: GraficoIngresosComponent;
  let fixture: ComponentFixture<GraficoIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoIngresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
