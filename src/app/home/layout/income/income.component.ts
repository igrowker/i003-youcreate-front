import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NumberWithDotsPipe } from '../../../shared/pipes/number-with-dots.pipe';
import { SwapGraphicsComponent } from '../../components/specific/swap-graphics/swap-graphics.component';

import { TokenService } from '../../../core/services/token.service';
import { RegisterIncomeDialogComponent } from '../../components/register-income-dialog/register-income-dialog.component';
import { IngresosService } from '../../../services/ingresos.service';
import { SwapGraphicTableComponent } from "../../components/specific/swap-graphic-table/swap-graphic-table.component";


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule, 
    NumberWithDotsPipe,
    RegisterIncomeDialogComponent,
    SwapGraphicsComponent,
    SwapGraphicTableComponent
],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {

  public currency: string = 'ARS';
  
  public totalIncome = 0;

  constructor(
    private ingresosService: IngresosService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.ingresosTotales();
  }


  ingresosTotales(){
    this.ingresosService.getTotalIngresos(this.tokenService.getUserId()).subscribe({
      next:(data)=>{
        this.totalIncome = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    
  }
}
