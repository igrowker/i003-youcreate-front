import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { create } from 'domain';

@Component({
  selector: 'bar-graphic',
  standalone: true,
  imports: [],
  templateUrl: './bar-graphic.component.html',
  styleUrl: './bar-graphic.component.css'
})
export class BarGraphicComponent implements OnInit, OnChanges {

  @Input({ required: true }) data!: number[];

  chart!: Chart;

  months: string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];

  barStyles = [
    '#37e7ff',
    '#D7FAFF',
    '#AFF5FF',
    '#87F1FF',
    '#5FECFF',
    '#13E3FF',
    '#00D2EF',
    '#00B3CB',
    '#0094A8',
    '#007484',
    '#005561',
    '#053F47'
  ]

  ngOnInit(): void {
    this.createChart();
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.createChart();
  }

  private createChart():void{
    this.destroyChart();
    const data = {
      labels: this.months,
      datasets: [{
        label: 'Ingresos por año',
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
          formatter: (value: number) => this.formatPercentage(value),
        },
      }],
    };

    this.chart = new Chart("chart", {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            grid: {
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
    });
  }

  private destroyChart():void{
    if(this.chart){
      this.chart.destroy();
    }
  }

  private getContrastingColor(color: string): string {
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

  private formatPercentage(value: number): string {
    const total = this.data.reduce((acc: number, val: number) => acc + val, 0);
    const percentage = ((value / total) * 100).toFixed(2) + '%';
    return percentage;
  }
}



