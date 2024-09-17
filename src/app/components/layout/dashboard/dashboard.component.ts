import { Component } from '@angular/core';
import { DashboardImpuestosComponent } from '../../specific/dashboard-impuestos/dashboard-impuestos.component';
import { DashboardIngresosComponent } from '../../specific/dashboard-ingresos/dashboard-ingresos.component';
import { DashboardPagosComponent } from '../../specific/dashboard-pagos/dashboard-pagos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardImpuestosComponent,
    DashboardIngresosComponent,
    DashboardPagosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
