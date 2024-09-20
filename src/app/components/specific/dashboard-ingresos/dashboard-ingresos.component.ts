import { Component } from '@angular/core';
import { GraficoIngresosComponent } from "../../common/grafico-ingresos/grafico-ingresos.component";

@Component({
  selector: 'app-dashboard-ingresos',
  standalone: true,
  imports: [GraficoIngresosComponent],
  templateUrl: './dashboard-ingresos.component.html',
  styleUrl: './dashboard-ingresos.component.css'
})
export class DashboardIngresosComponent {

}
