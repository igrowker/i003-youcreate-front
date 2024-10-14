import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapTablaMesComponent } from './swap-tabla-mes.component';

describe('SwapTablaMesComponent', () => {
  let component: SwapTablaMesComponent;
  let fixture: ComponentFixture<SwapTablaMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapTablaMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapTablaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
