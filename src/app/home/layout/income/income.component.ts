import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

import { Income, IncomeHistory } from '../../../core/models/income.interface';

import { BarGraphicComponent } from '../../components/bar-graphic/bar-graphic.component';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { NumberWithDotsPipe } from '../../../shared/pipes/number-with-dots.pipe';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SwapGraphicsComponent } from '../../components/specific/swap-graphics/swap-graphics.component';

import { PaginatorService } from '../../../services/paginator.service';
import { TokenService } from '../../../core/services/token.service';
import { RegisterIncomeDialogComponent } from '../../components/register-income-dialog/register-income-dialog.component';
import { IngresosService } from '../../../services/ingresos.service';
import { DateService } from '../../../services/date.service';
import { SwapTablaMesComponent } from "../../components/specific/swap-tabla-mes/swap-tabla-mes.component";
import { SwapBarGraphicComponent } from "../../components/specific/swap-bar-graphic/swap-bar-graphic.component";
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
