import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-ingresos',
  standalone: true,
  imports: [],
  templateUrl: './grafico-ingresos.component.html',
  styleUrl: './grafico-ingresos.component.css'
})
export class GraficoIngresosComponent implements OnInit{

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
        label: 'My First Dataset',
        data: [300, 50, 100, 20, 150],
        backgroundColor: [
          'rgb(196, 48, 43)',
          'rgb(100, 65, 165)',
          'rgb(91, 91, 91)',
          'rgb(57, 63, 80)',
          'rgb(58, 58, 58)',
        ],
        hoverOffset: 4
      }]
    };

    this.chart = new Chart("chart",{
      type:'doughnut' as ChartType,
      data: data,
    });
  }

}
