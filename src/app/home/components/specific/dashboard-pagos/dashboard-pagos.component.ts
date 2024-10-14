import { Component } from '@angular/core';
import { CardDashboardComponent } from "../../common/card-dashboard/card-dashboard.component";
import { Card } from '../../../../core/models/card.interface';

@Component({
  selector: 'app-dashboard-pagos',
  standalone: true,
  imports: [CardDashboardComponent],
  templateUrl: './dashboard-pagos.component.html',
  styleUrl: './dashboard-pagos.component.css'
})
export class DashboardPagosComponent {
  valores : Card[];

  constructor() {
     this.valores = [
       {
         title: 'Suelen',
         monto: 14.000,
         vencimiento: '12/10/2024',
         details: 'Desarrolladora Frontend'
       },
       {
         title: 'Agos',
         monto: 14.000,
         vencimiento: '12/10/2024',
         details: 'Project Manager'
       },
       {
         title: 'André',
         monto: 14.000,
         vencimiento: '12/10/2024',
         details: 'Desarrollador Backend'
       }
     ]
  }
}
