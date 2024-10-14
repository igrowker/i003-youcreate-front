import { Component, OnInit } from '@angular/core';
import { TablaMesComponent } from "../../common/tabla-mes/tabla-mes.component";
import { Income } from '../../../../core/models/income.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class SwapTablaMesComponent implements OnInit {

  monthForm: FormGroup;
  months: string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  incomes: Income[] = [];
  userId :number;

  constructor(
    private dateService: DateService,
    private ingresoService: IngresosService,
    private tokenService: TokenService
  ) {

    this.userId = tokenService.getUserId();

    this.monthForm = new FormGroup({
      selectedMonth: new FormControl(dateService.getMesActual()),
    });

    this.monthForm.get('selectedMonth')?.valueChanges.subscribe((value:number) => {
      this.onSubmit(value);
    })
  }

  ngOnInit(): void {

  }

  onSubmit(selectedMonth: number) {
    this.obtenerIngresos(selectedMonth);
  }

  obtenerIngresos(mes:number){
    this.ingresoService.getIngresosDelMes(this.userId,mes,this.dateService.getAnioActual())
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.incomes = data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
