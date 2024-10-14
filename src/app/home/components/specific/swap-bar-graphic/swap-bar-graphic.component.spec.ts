import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapBarGraphicComponent } from './swap-bar-graphic.component';

describe('SwapBarGraphicComponent', () => {
  let component: SwapBarGraphicComponent;
  let fixture: ComponentFixture<SwapBarGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapBarGraphicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapBarGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
