import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorType } from '../../../core/models/error-type.interface';
import { Payment } from '../../../core/models/payment.interface';

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
  public paymentMethod:string[] = [
    'Transferencia Bancaria',
    'Tarjeta De Crédito',
    'Tarjeta De Debito',
    'Otro'
  ]

  @Output() formValues = new EventEmitter<Payment>();

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
      this.registerPaymentsForm = this.fb.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        metodo_pago: ['', [Validators.required]],
        fecha_pago: ['', [Validators.required, this.validDateValidator]],
        descripcion: ['', [Validators.required]],
        monto: [0, [Validators.required, Validators.min(500)]],
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

    this.registerPaymentsForm.reset({
      name: '',
      wallet: '',
      fecha_pago: '',
      descripcion: '',
      monto: 0
    });
  }


  validDateValidator(control: AbstractControl): ValidationErrors | null {

    const inputDate = new Date(control.value);

    if (isNaN(inputDate.getTime())) {
      return { invalidDate: true };
    }

    return null;
  }

  setFormErrorMessage(error: ValidationErrors | null | undefined):string {

    const formErrorMessages: ErrorType = {
      'required': 'Este campo es requerido',
      'min': 'El monto minimo es 500',
      'invalidDate': 'Fecha Invalida',
    };

    const firstErrorKey = error ? Object.keys(error)[0] : null;

    const errorMessage = error && firstErrorKey ? formErrorMessages[firstErrorKey] : '';

    return  errorMessage;

  }

  setErrorName(): string {
    if(this.registerPaymentsForm.get('nombre')?.errors) {
      return  this.setFormErrorMessage(this.registerPaymentsForm.get('nombre')?.errors);
    }else if (this.registerPaymentsForm.get('apellido')?.errors){
      return  this.setFormErrorMessage(this.registerPaymentsForm.get('apellido')?.errors);
    }

    return '';
  }





}
