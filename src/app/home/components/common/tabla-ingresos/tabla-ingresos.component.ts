import { Component, Input, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tabla-ingresos',
  standalone: true,
  imports: [ MatTableModule ],
  templateUrl: './tabla-ingresos.component.html',
  styleUrl: './tabla-ingresos.component.css'
})
export class TablaIngresosComponent implements OnInit{

  @Input() valores!: number[];
  columnas= ['fuente', 'monto']

  datos=[
    {
      fuente:"Youtube",
      monto:0
    },
    {
      fuente:"Twitch",
      monto:0
    },
    {
      fuente:"Campañas",
      monto:0
    },
    {
      fuente:"Colaboradores",
      monto:0
    },
    {
      fuente:"Regalos",
      monto:0
    }
  ];
  ngOnInit(): void {
    this.cargarTabla();
  }
  
  cargarTabla(){
    this.datos.forEach((dato,index)=>{
      dato.monto = this.valores[index];
    });
  }

}
