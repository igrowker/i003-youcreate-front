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


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    BarGraphicComponent,
    BtnDropdownComponent,
    NumberWithDotsPipe,
    PaginatorComponent,
    SpinnerComponent,
    SwapGraphicsComponent,
    RegisterIncomeDialogComponent,
    SwapTablaMesComponent,
    SwapBarGraphicComponent
],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {

  public currency: string = 'ARS';
  public currentPage: number = 1;
  public rawsPerPage: number = 8;
  public isLoadingYear: boolean = false;
  public isLoadingMonth: boolean = false;

  public currentYear: number = new Date().getFullYear();
  public monthToFilter = signal<string>('');
  public typeToFilter = signal<string>('');
  public yearToFilter = signal<string>('');
  public totalIncome = signal<number>(0);

  public categoryOptions: string[] = ['categoria 1', 'categoria 2', 'categoria 3'];
  public filterType: string[] = ['Filtrar por mes', 'Filtrar por año', 'Reiniciar filtro'];
  
 
  public years: string[] = [];
  public incomeList: Income[] = [];


  constructor(
    private paginatorService: PaginatorService,
    private ingresosService: IngresosService,
    private tokenService: TokenService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.generateYearList();

    const { user_id } = this.tokenService.decodeToken();

    this.getIncomeData(user_id);
    this.getTotalIncome(user_id);

  }



  getIncomeData(userId: number): void {
    this.isLoadingMonth = true;
    this.ingresosService.getAllIngresos(userId).subscribe({
      next: (resp) => {
        Array.isArray(resp) ? this.incomeList = resp : this.incomeList = [];
        this.isLoadingMonth = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMonth = false;
      }
    })
  }

  getTotalIncome(userId: number): void {
    this.ingresosService.getTotalIngresos(userId).subscribe({
      next: (total) => {
        total !== null ? this.totalIncome.set(total) : this.totalIncome.set(0);
      },
      error: err => console.error(err)
    })

  }

  paginatedData(dataList: Income[]): Income[] {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, dataList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getTypeToFilter(value: string) {
    if (value === 'Reiniciar filtro') {
      this.resetFilters();
    } else {
      this.typeToFilter.set(value);
    }
  }

  getMonthToFilter(month: string) {
    this.monthToFilter.set(month)
  }

  getYearToFilter(year: string) {
    this.yearToFilter.set(year)

    //TODO: cambiar cuando se tenga el endpoint
    this.isLoadingYear = true;
    setTimeout(() => {
      this.isLoadingYear = false;
    }, 3000)
  }







  setNewIncomeRegistered(newIncome: Income) {

    this.ingresosService.postIngreso(newIncome)
      .subscribe({
        next: (resp) => {
          console.log('ingreso creado', resp);
        },
        error: (err) => {
          console.log('Error al cargar ingreso', err);
        }
      });
  }




  generateYearList() {
    for (let i = 0; i <= 4; i++) {
      const newYear = (this.currentYear - i).toString()
      this.years.push(newYear);
    }
  }

  isYearsOrMonthsDropdown(): boolean {
    if (this.typeToFilter().toLocaleLowerCase() === 'filtrar por mes') return true;
    if (this.typeToFilter().toLocaleLowerCase() === 'filtrar por año') return false;
    return true;
  }

  resetFilters() {
    this.typeToFilter.set('');
    this.monthToFilter.set('');
    this.yearToFilter.set('');
  }

}
