import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-grafico-ingresos',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './grafico-ingresos.component.html',
  styleUrl: './grafico-ingresos.component.css'
})
export class GraficoIngresosComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chartCanvas',{static:false}) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() valores!: number[];
  chart: Chart | null = null;
 
  constructor(){}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(){
    if(this.chart){
      this.chart.destroy();
    }
  }

  createChart(){

    if(!this.valores || this.valores.length === 0){
      console.error('Error: Los valores del grafico no estan definidos o estan vacios');
      return;
    }

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
          position: 'right' as const,
          labels: {
            boxWidth: 10,
            font: {
              size: 15,
              weight: 800
            }
          }
        }
      }
    };

    const canvas = this.chartCanvas.nativeElement.getContext('2d');
    if(canvas){
      this.chart = new Chart(canvas, {
        type: 'doughnut' as ChartType,
        data: data,
        options: options
      });
    }else{
      console.log("Error: Fallo al adquirir contexto.");
    }
  }

}
