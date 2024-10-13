import { Component, OnInit } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { GraficoLinealComponent } from "../../common/grafico-lineal/grafico-lineal.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresosService } from '../../../../services/ingresos.service';
import { Income } from '../../../../core/models/income.interface';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-swap-graphics',
  standalone: true,
  imports: [GraficoIngresosComponent, GraficoLinealComponent ,NgIf, FormsModule],
  templateUrl: './swap-graphics.component.html',
  styleUrl: './swap-graphics.component.css'
})
export class SwapGraphicsComponent implements OnInit{

  elegido: string = 'donut';
  ingresosMensuales = [
    {
      "monto":"20000",
      "origen":"youtube",
      "fecha":"10/10/2024",
      "descripcion":"publicidad",
    },
    {
      "monto":"20000",
      "origen":"twitch",
      "fecha":"09/10/2024",
      "descripcion":"publicidad",
    },
    {
      "monto":"30000",
      "origen":"youtube",
      "fecha":"10/10/2024",
      "descripcion":"publicidad",
    },
    {
      "monto":"10000",
      "origen":"youtube",
      "fecha":"10/10/2024",
      "descripcion":"publicidad",
    }
  ];

  constructor(
    private ingresosService: IngresosService,
    private tokenService: TokenService
  ){}
  ngOnInit() {
    this.ingresosDelMes();
  }

  /*monto origen fecha descripcion */



  ingresosDelMes(){
    const id = this.tokenService.getUserId();
    this.ingresosService.getIngresosDelMes(id,10,2024).subscribe({
      next: (rta)=>{
        console.log(rta);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

}
