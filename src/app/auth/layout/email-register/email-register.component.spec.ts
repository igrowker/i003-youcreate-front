import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegisterComponent } from './email-register.component';

describe('EmailRegisterComponent', () => {
  let component: EmailRegisterComponent;
  let fixture: ComponentFixture<EmailRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
