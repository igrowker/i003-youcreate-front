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
          backgroundColor: this.barStyles,
          categoryPercentage: 1.0,
          datalabels: {
            color: (context: any) => {
              const index = context.dataIndex;
              return this.getContrastingColor(this.barStyles[index]);
            },
            font: {
              family: 'Poppins',
              size: 12,
            },
            formatter: ( value: number ) => this.formatPercentage(value),
          },
        }],
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
            display: true,
            anchor: 'start',
            align: 'end',
            offset: -2,
            font: {
              weight: 'bolder'
            }
          }
        },
      },
      plugins: [ChartDataLabels]
    })
  };

  private getContrastingColor(color: string):string {

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

      const rgb = hexToRgb(color);
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 255000;

      return brightness > 0.5 ? '#000000' : '#FFFFFF';
    }

    private formatPercentage(value: number ):string {
      const total = this.data.reduce((acc: number, val: number) => acc + val, 0);
      const percentage = ((value / total) * 100).toFixed(2) + '%';
      return percentage;
    }
  }



