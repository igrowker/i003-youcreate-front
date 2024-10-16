import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType, Legend, plugins, scales } from 'chart.js';

@Component({
  selector: 'app-grafico-lineal',
  standalone: true,
  imports: [],
  templateUrl: './grafico-lineal.component.html',
  styleUrl: './grafico-lineal.component.css'
})
export class GraficoLinealComponent implements AfterViewInit, OnDestroy {
  
  
  
  @ViewChild('chartCanvas',{static:false}) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() valores!: any[];
  chart: Chart | null = null;
  

  ngAfterViewInit(): void {
    this.createChart();
  }
  ngOnDestroy(): void {
    if(this.chart){
      this.chart.destroy();
    }
  }

  createChart() {

    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Youtube',
        data: [65, 59, 80, 81, 56, 55, 40, 24, 12, 32, 90, 110],
        fill: false,
        backgroundColor:'#B79CFF',
        borderWidth:6,
        pointRadius:1,
        tension: 0
      },{
        label: 'Twitch',
        data: [45, 49, 90, 71, 26, 45, 60, 34, 22, 22, 80, 100],
        fill: false,
        backgroundColor:'#FBDEFF',
        borderWidth:6,
        pointRadius:1,
        tension: 0
      },{
        label: 'Campañas',
        data: [35, 39, 80, 61, 36, 55, 50, 34, 12, 22, 50, 90],
        fill: false,
        backgroundColor:'#EF7BFF',
        borderWidth:6,
        pointRadius:1,
        tension: 0
      },{
        label: 'Colaboradores',
        data: [55, 59, 100, 81, 46, 25, 30, 64, 42, 12, 40, 20],
        fill: false,
        backgroundColor:'#00B3CB',
        borderWidth:6,
        pointRadius:1,
        tension: 0
      },{
        label: 'Regalos',
        data: [15, 29, 10, 11, 36, 25, 30, 14, 22, 22, 30, 40],
        fill: false,
        backgroundColor:'#005561',
        borderWidth:6,
        pointRadius:1,
        tension: 0
      }]
    };
  
    const options = {
      responsive: true,
      mantainAspectRatio: false,
      layout:{
        padding:5
      },
      plugins:{
        legend:{
          position:'right' as const,
          labels:{
            boxWidth:10,
            borderWidth:0,
            font:{
              size:10,
              weight:700
            }
          }
        }
      },
      scales:{
        x:{
          ticks:{
            font:{
              weight:15,
              size:15
            }
          }
        }
      }
    }

    const canvas = this.chartCanvas.nativeElement.getContext('2d');
    if(canvas){
      this.chart= new Chart(canvas,{
        type:'line' as ChartType,
        data: data,
        options: options
      });
    }else{
      console.log("Error: Fallo al adquirir contexto.");
    }  
  }
  

}
