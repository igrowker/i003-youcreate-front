import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { response } from 'express';

@Component({
  selector: 'app-grafico-ingresos',
  standalone: true,
  imports: [],
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
          'rgb(196, 48, 43)',
          'rgb(100, 65, 165)',
          'rgb(91, 91, 91)',
          'rgb(57, 63, 80)',
          'rgb(58, 58, 58)',
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
