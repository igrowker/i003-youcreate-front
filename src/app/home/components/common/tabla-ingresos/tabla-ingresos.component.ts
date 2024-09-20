import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tabla-ingresos',
  standalone: true,
  imports: [ MatTableModule ],
  templateUrl: './tabla-ingresos.component.html',
  styleUrl: './tabla-ingresos.component.css'
})
export class TablaIngresosComponent {

  columnas= ['fuente', 'monto']

  datos=[
    {
      fuente:"Twitch",
      monto:400000
    },
    {
      fuente:"Youtube",
      monto:30000
    }
    ,
    {
      fuente:"Campañas",
      monto:4500
    },
    {
      fuente:"Regalos",
      monto:23000
    }
  ];
}
