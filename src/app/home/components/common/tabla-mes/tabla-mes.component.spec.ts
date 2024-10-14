import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMesComponent } from './tabla-mes.component';

describe('TablaMesComponent', () => {
  let component: TablaMesComponent;
  let fixture: ComponentFixture<TablaMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
