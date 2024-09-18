import { Component } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";
import { TablaIngresosComponent } from "../../common/tabla-ingresos/tabla-ingresos.component";

@Component({
  selector: 'app-dashboard-ingresos',
  standalone: true,
  imports: [GraficoIngresosComponent, TablaIngresosComponent],
  templateUrl: './dashboard-ingresos.component.html',
  styleUrl: './dashboard-ingresos.component.css'
})
export class DashboardIngresosComponent {

}
