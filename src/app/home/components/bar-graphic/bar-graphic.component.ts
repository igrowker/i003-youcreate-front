import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels  from 'chartjs-plugin-datalabels';

@Component({
  selector: 'bar-graphic',
  standalone: true,
  imports: [],
  templateUrl: './bar-graphic.component.html',
  styleUrl: './bar-graphic.component.css'
})
export class BarGraphicComponent implements OnInit{

  @Input({required: true}) labels!: string[];
  @Input({required: true}) data!: number[];
  @Input({required: true}) barStyles!: string[];
  @Input() title: string = '';

  chart!: Chart;



  ngOnInit(): void {

    const data = {
      labels: this.labels,
        datasets: [{
          label: this.title,
          data: this.data,
          backgroundColor: this.barStyles
        }],
        datalabels: {
          color: '#ffffff', // Cambia el color de las etiquetas
          font: {
            family: 'Arial', // Cambia el tipo de letra de las etiquetas
            size: 14         // Cambia el tamaño de la fuente
          },
          formatter: (value: number, context: any) => {
            const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return percentage;
          }
        }
    };

    this.chart = new Chart("chart", {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            grid:{
              display: false
            },
            ticks: {
              font: {
                family: 'Poppins',
                size: 13,
                weight: 'bolder'
              },
              color: '#000000'
            }
          },
          y: {
            beginAtZero: true,
            display: false
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: 'Poppins',
                size: 18,
                weight: 'bolder'
              },
              color: '#000000'
            }
          },
          datalabels: {
            display: true
          }

        },

      },
      plugins: [ChartDataLabels]
    })




  }
}
