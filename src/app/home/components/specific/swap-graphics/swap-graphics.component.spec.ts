import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapGraphicsComponent } from './swap-graphics.component';

describe('SwapGraphicsComponent', () => {
  let component: SwapGraphicsComponent;
  let fixture: ComponentFixture<SwapGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapGraphicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
