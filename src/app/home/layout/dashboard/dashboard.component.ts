import { Component } from '@angular/core';
import { DashboardImpuestosComponent } from '../../components/specific/dashboard-impuestos/dashboard-impuestos.component';
import { DashboardIngresosComponent } from '../../components/specific/dashboard-ingresos/dashboard-ingresos.component';
import { DashboardPagosComponent } from '../../components/specific/dashboard-pagos/dashboard-pagos.component';

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
export class DashboardComponent{
}
