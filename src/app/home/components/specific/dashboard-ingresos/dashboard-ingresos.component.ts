import { Component } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { TablaIngresosComponent } from "../../common/tabla-ingresos/tabla-ingresos.component";
import { GraficoLinealComponent } from "../../common/grafico-lineal/grafico-lineal.component";
import { SwapGraphicsComponent } from "../swap-graphics/swap-graphics.component";

@Component({
  selector: 'app-dashboard-ingresos',
  standalone: true,
  imports: [GraficoIngresosComponent, TablaIngresosComponent, GraficoLinealComponent, SwapGraphicsComponent],
  templateUrl: './dashboard-ingresos.component.html',
  styleUrl: './dashboard-ingresos.component.css'
})
export class DashboardIngresosComponent {

}
