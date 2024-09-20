import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIngresosComponent } from './tabla-ingresos.component';

describe('TablaIngresosComponent', () => {
  let component: TablaIngresosComponent;
  let fixture: ComponentFixture<TablaIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaIngresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
