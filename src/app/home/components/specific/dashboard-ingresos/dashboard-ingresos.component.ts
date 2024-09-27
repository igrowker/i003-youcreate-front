import { Component } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { TablaIngresosComponent } from "../../common/tabla-ingresos/tabla-ingresos.component";
import { GraficoLinealComponent } from "../../common/grafico-lineal/grafico-lineal.component";
import { SwapGraphicsComponent } from "../swap-graphics/swap-graphics.component";
import { SwapTableComponent } from "../swap-table/swap-table.component";

@Component({
  selector: 'app-dashboard-ingresos',
  standalone: true,
  imports: [GraficoIngresosComponent, TablaIngresosComponent, GraficoLinealComponent, SwapGraphicsComponent, SwapTableComponent],
  templateUrl: './dashboard-ingresos.component.html',
  styleUrl: './dashboard-ingresos.component.css'
})
export class DashboardIngresosComponent {

}
