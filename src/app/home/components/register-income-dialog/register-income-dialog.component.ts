import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorType } from '../../../core/models/error-type.interface';
import { CommonModule } from '@angular/common';
import { Income } from '../../../core/models/income.interface';

@Component({
  selector: 'register-income-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register-income-dialog.component.html',
  styleUrl: './register-income-dialog.component.css'
})
export class RegisterIncomeDialogComponent implements OnInit{

  public isVisible = false;
  public registerIncomeForm!: FormGroup;
  public paymentMethod:string[] = [
    'Youtube',
    'Twitch',
    'Campañas',
    'Colaboraciones',
    'Regalos'
  ]

  @Output() formValues = new EventEmitter<Income>();

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
      this.registerIncomeForm = this.fb.group({
        origen: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        fecha: ['', [Validators.required, this.validDateValidator]],
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
    this.formValues.emit(this.registerIncomeForm.value);

    this.registerIncomeForm.reset({
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

}
