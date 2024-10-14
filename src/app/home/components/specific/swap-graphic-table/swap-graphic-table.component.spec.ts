import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapGraphicTableComponent } from './swap-graphic-table.component';

describe('SwapGraphicTableComponent', () => {
  let component: SwapGraphicTableComponent;
  let fixture: ComponentFixture<SwapGraphicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapGraphicTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapGraphicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
