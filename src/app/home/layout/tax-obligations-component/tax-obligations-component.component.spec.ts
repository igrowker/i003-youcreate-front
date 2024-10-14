import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxObligationsComponentComponent } from './tax-obligations-component.component';

describe('TaxObligationsComponentComponent', () => {
  let component: TaxObligationsComponentComponent;
  let fixture: ComponentFixture<TaxObligationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxObligationsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxObligationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
