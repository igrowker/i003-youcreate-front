import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLinealComponent } from './grafico-lineal.component';

describe('GraficoLinealComponent', () => {
  let component: GraficoLinealComponent;
  let fixture: ComponentFixture<GraficoLinealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoLinealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoLinealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
