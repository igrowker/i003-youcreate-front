import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterPayments } from '../../../core/models/register-payments.interface';

@Component({
  selector: 'register-payments-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register-payments-dialog.component.html',
  styleUrl: './register-payments-dialog.component.css'
})
export class RegisterPaymentsDialogComponent implements OnInit{

  public isVisible = false;
  public registerPaymentsForm!: FormGroup;

  @Output() formValues = new EventEmitter<RegisterPayments>();

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
      this.registerPaymentsForm = this.fb.group({
        name: ['', [Validators.required]],
        wallet: ['', [Validators.required]],
        date: ['', [Validators.required]],
        service: ['', [Validators.required]],
        monto: [0, [Validators.required]],
      })
  }

  openDialog() {
    this.isVisible = true;
  }

  closeDialog() {
    this.isVisible = false;
  }

  submitForm() {
    this.formValues.emit(this.registerPaymentsForm.value);
  }
}
