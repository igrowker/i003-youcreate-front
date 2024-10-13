import { Component, OnInit } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { GraficoLinealComponent } from "../../common/grafico-lineal/grafico-lineal.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresosService } from '../../../../services/ingresos.service';
import { Income } from '../../../../core/models/income.interface';
import { TokenService } from '../../../../core/services/token.service';
import { DateService } from '../../../../services/date.service';

@Component({
  selector: 'app-swap-graphics',
  standalone: true,
  imports: [GraficoIngresosComponent, GraficoLinealComponent ,NgIf, FormsModule],
  templateUrl: './swap-graphics.component.html',
  styleUrl: './swap-graphics.component.css'
})
export class SwapGraphicsComponent implements OnInit{

  elegido: string = 'donut';

  totalCategoria :{[key:string]:number}  = {
    youtube:0,
    twitch:0,
    campania:0,
    colaboradores:0,
    regalos:0,
  }
  mes: string = '';
  valores : number[] = [];
  public months:string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];

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
    this.mes = this.months[this.dateService.getMesActual() - 1];
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
