import { Component } from '@angular/core';
import { TablaIngresosComponent } from "../../common/tabla-ingresos/tabla-ingresos.component";

@Component({
  selector: 'app-swap-table',
  standalone: true,
  imports: [TablaIngresosComponent],
  templateUrl: './swap-table.component.html',
  styleUrl: './swap-table.component.css'
})
export class SwapTableComponent {

}
