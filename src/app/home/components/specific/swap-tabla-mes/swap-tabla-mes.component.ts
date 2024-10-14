import { Component, OnInit } from '@angular/core';
import { TablaMesComponent } from "../../common/tabla-mes/tabla-mes.component";
import { Income } from '../../../../core/models/income.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DateService } from '../../../../services/date.service';
import { IngresosService } from '../../../../services/ingresos.service';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-swap-tabla-mes',
  standalone: true,
  imports: [TablaMesComponent, NgFor, ReactiveFormsModule],
  templateUrl: './swap-tabla-mes.component.html',
  styleUrl: './swap-tabla-mes.component.css'
})
export class SwapTablaMesComponent{
  monthForm: FormGroup;
  months: string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  incomes: Income[] = [];
  userId: number;

  constructor(
    private dateService: DateService,
    private ingresoService: IngresosService,
    private tokenService: TokenService,
    private fb: FormBuilder // Usa FormBuilder para simplificar la creación de formularios
  ) {
    this.userId = this.tokenService.getUserId();


    this.monthForm = this.fb.group({
      selectedMonth: [this.dateService.getMesActual()] // Selecciona el mes actual por defecto
    });

  
    this.monthForm.get('selectedMonth')?.valueChanges.subscribe((value) => {
      this.onMonthChange(value);
    });
  }

  onMonthChange(selectedMonth: number) {
    this.obtenerIngresos(selectedMonth);
  }

  
  obtenerIngresos(mes: number) {
    this.ingresoService.getIngresosDelMes(this.userId, mes, this.dateService.getAnioActual())
      .subscribe({
        next: (data) => {
          this.incomes = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  trackByIndex(index: number, item: string): number {
    return index; // devuelve el índice como identificador
  }

}
