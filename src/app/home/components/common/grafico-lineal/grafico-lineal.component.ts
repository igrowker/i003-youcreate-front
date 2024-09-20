import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-lineal',
  standalone: true,
  imports: [],
  templateUrl: './grafico-lineal.component.html',
  styleUrl: './grafico-lineal.component.css'
})
export class GraficoLinealComponent implements OnInit {
  

  public chart?: Chart;
  
  ngOnInit(): void {
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
        borderColor: 'rgb(196, 48, 43)',
        borderWidth:1,
        pointRadius:1,
        tension: 0
      },{
        label: 'Twitch',
        data: [45, 49, 90, 71, 26, 45, 60, 34, 22, 22, 80, 100],
        fill: false,
        borderColor: 'rgb(100, 65, 165)',
        borderWidth:1,
        pointRadius:1,
        tension: 0
      },{
        label: 'Campañas',
        data: [35, 39, 80, 61, 36, 55, 50, 34, 12, 22, 50, 90],
        fill: false,
        borderColor: 'rgb(91, 91, 91)',
        borderWidth:1,
        pointRadius:1,
        tension: 0
      },{
        label: 'Colaboradores',
        data: [55, 59, 100, 81, 46, 25, 30, 64, 42, 12, 40, 20],
        fill: false,
        borderColor: 'rgb(57, 63, 80)',
        borderWidth:1,
        pointRadius:1,
        tension: 0
      },{
        label: 'Regalos',
        data: [15, 29, 10, 11, 36, 25, 30, 14, 22, 22, 30, 40],
        fill: false,
        borderColor: 'rgb(58, 58, 58)',
        borderWidth:1,
        pointRadius:1,
        tension: 0
      }]
    };
  
    const options = {
      responsive: true,
      mantainAspectRatio: false,
      layout:{
        padding:5
      }
    }
  
    this.chart= new Chart("chart",{
      type:'line' as ChartType,
      data: data,
      options: options
    })
  }
  
  


}
