import { Component, OnInit } from '@angular/core';
import { BarGraphicComponent } from "../../bar-graphic/bar-graphic.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TokenService } from '../../../../core/services/token.service';
import { DateService } from '../../../../services/date.service';
import { IngresosService } from '../../../../services/ingresos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-swap-bar-graphic',
  standalone: true,
  imports: [BarGraphicComponent, ReactiveFormsModule, NgFor,NgIf],
  templateUrl: './swap-bar-graphic.component.html',
  styleUrl: './swap-bar-graphic.component.css'
})
export class SwapBarGraphicComponent implements OnInit{

  public dataGraficoPrueba: number[] = [];
  years = ['2020', '2021', '2022', '2023', '2024'];
  yearForm: FormGroup;
  userId: number;
  yearEmpty: boolean = false;

  constructor(
    private dateService: DateService,
    private ingresoService: IngresosService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {
    this.userId = this.tokenService.getUserId();

    this.yearForm = this.fb.group({
      selectedYear: [this.dateService.getAnioActual()]
    });

    this.yearForm.get('selectedYear')?.valueChanges.subscribe((value) => {
      this.onYearChange(value);
    })
  }

  ngOnInit(): void {
    this.obtenerIngresos(this.dateService.getAnioActual())
  }

  onYearChange(selectedYear: number) {
    this.obtenerIngresos(selectedYear);
  }

  obtenerIngresos(year: number) {
    const requests = []; // Crea un array para almacenar las solicitudes

    for (let i = 0; i < 12; i++) {
      const request = this.ingresoService.getTotalDelMes(this.userId, i, year);
      requests.push(request); // Agrega cada solicitud al array
    }

    // Utiliza forkJoin para esperar a que todas las solicitudes se completen
    forkJoin(requests).subscribe({
      next: (results: number[]) => {
        this.dataGraficoPrueba = results.map(result =>{
          return Object.values(result)[0];
        });

        const vacio = this.dataGraficoPrueba.every(value =>value === 0);
        if(vacio){
          this.yearEmpty = true;
        }else{
          this.yearEmpty = false;
        }
        console.log(this.dataGraficoPrueba); // Muestra los resultados en la consola
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  trackByIndex(index: number, item: string): number {
    return index; // devuelve el índice como identificador
  }

}
