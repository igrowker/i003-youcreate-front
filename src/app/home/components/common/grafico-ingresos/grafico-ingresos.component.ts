import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-grafico-ingresos',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './grafico-ingresos.component.html',
  styleUrl: './grafico-ingresos.component.css'
})
export class GraficoIngresosComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chartCanvas',{static:false}) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild ('chartContainer',{static:false}) chartContainer!: ElementRef<HTMLDivElement>;

  @Input() valores!: number[];
  chart: Chart | null = null;
  resizeObserver!: ResizeObserver;
  isBrowser:boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser= isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if(this.isBrowser){
      window.dispatchEvent(new Event('resize'));
      this.createChart();

      this.resizeObserver = new ResizeObserver(()=>{
        this.resizeChart(); //Cuando el contenedor cambie, redibuja el grafico
      });
  
      this.resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  ngOnDestroy(){
    if(this.resizeObserver){
      this.resizeObserver.disconnect();
    }
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
              size: 10,
              weight: 700
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

  resizeChart(){
    if(this.chart){
      this.chart.resize();
    }
  }

}
