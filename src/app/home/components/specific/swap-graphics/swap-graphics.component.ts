import { Component } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { GraficoLinealComponent } from "../../common/grafico-lineal/grafico-lineal.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-swap-graphics',
  standalone: true,
  imports: [GraficoIngresosComponent, GraficoLinealComponent ,NgIf, FormsModule],
  templateUrl: './swap-graphics.component.html',
  styleUrl: './swap-graphics.component.css'
})
export class SwapGraphicsComponent {

  elegido: string = 'donut';
}
