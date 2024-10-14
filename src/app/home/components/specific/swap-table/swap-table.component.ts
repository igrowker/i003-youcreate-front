import { Component } from '@angular/core';
import { TablaIngresosComponent } from "../../common/tabla-ingresos/tabla-ingresos.component";
import { Income } from '../../../../core/models/income.interface';
import { TokenService } from '../../../../core/services/token.service';
import { DateService } from '../../../../services/date.service';
import { IngresosService } from '../../../../services/ingresos.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-swap-table',
  standalone: true,
  imports: [TablaIngresosComponent,NgIf],
  templateUrl: './swap-table.component.html',
  styleUrl: './swap-table.component.css'
})
export class SwapTableComponent {
  totalCategoria :{[key:string]:number}  = {
    youtube:0,
    twitch:0,
    campañas:0,
    colaboraciones:0,
    regalos:0,
  }
  public months:string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  mes: string = '';
  valores : number[] = [];

  constructor(
    private ingresosService: IngresosService,
    private tokenService: TokenService,
    private dateService: DateService
  ){}
  ngOnInit() {
    this.setNombreMes();
    this.ingresosDelMes();
  }

  /*monto origen fecha descripcion */

  setNombreMes(){
    this.mes = this.months[this.dateService.getMesActual()-1];
  }

  ingresosDelMes(){
    const id = this.tokenService.getUserId();
    const mes = this.dateService.getMesActual();
    const anio = this.dateService.getAnioActual();
    this.ingresosService.getIngresosDelMes(id,mes,anio).subscribe({
      next: (rta)=>{
        this.sumarIngresos(rta);
        this.valores = Object.values(this.totalCategoria);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  sumarIngresos(ingresos: Income[]){
    ingresos.forEach( (ing)=>{
      const categoria = ing.categoria || '';
      const monto = Number(ing.monto);
      if(this.totalCategoria.hasOwnProperty(categoria)){
        this.totalCategoria[categoria] += monto;
      }
    });
  }
}
