import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-grafico-ingresos',
  standalone: true,
  imports: [ MatButtonToggleModule ],
  templateUrl: './grafico-ingresos.component.html',
  styleUrl: './grafico-ingresos.component.css'
})
export class GraficoIngresosComponent implements OnInit {

  @Input() valores!: number[];
  public chart?: Chart;


  ngOnInit(): void {
    const data = {
      labels: [
        'Youtube',
        'Twitch',
        'Campañas',
        'Colaboradores',
        'Regalos'
      ],
      datasets: [{
        label: 'Ingreso',
        data: this.valores,
        backgroundColor: [
          '#B79CFF',
          '#FBDEFF',
          '#EF7BFF',
          '#00B3CB',
          '#005561',
        ],
        hoverOffset: 4
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 5
      },
      plugins: {
        legend: {
          position: 'right' as const
        }
      }
    };


    this.chart = new Chart("chart", {
      type: 'doughnut' as ChartType,
      data: data,
      options: options
    });

  }


}
