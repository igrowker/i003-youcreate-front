import { Component } from '@angular/core';
import { CardDashboardComponent } from "../../common/card-dashboard/card-dashboard.component";
import { Card } from '../../../../core/models/card.interface';

@Component({
  selector: 'app-dashboard-impuestos',
  standalone: true,
  imports: [CardDashboardComponent],
  templateUrl: './dashboard-impuestos.component.html',
  styleUrl: './dashboard-impuestos.component.css'
})
export class DashboardImpuestosComponent {
  valores : Card[];

  constructor(){
    this.valores =[
    {
      title: 'Prueba 1',
      monto:'ARS 14.000',
      vencimiento:'12/10/2024',
      details:'Detalle de tarjeta'
    },
    {
      title: 'Prueba 2',
      monto:'ARS 14.000',
      vencimiento:'12/10/2024',
      details:'Detalle de tarjeta'
    },
    {
      title: 'Prueba 3',
      monto:'ARS 14.000',
      vencimiento:'12/10/2024',
      details:'Detalle de tarjeta'
    }
  ] 
  }
}
