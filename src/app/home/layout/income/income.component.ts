import { Component, OnInit } from '@angular/core';
import { Income } from '../../../core/models/income.interface';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorService } from '../../../services/paginator.service';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { SwapGraphicsComponent } from '../../components/specific/swap-graphics/swap-graphics.component';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    PaginatorComponent,
    BtnDropdownComponent,
    SwapGraphicsComponent
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{

  incomeList: Income[] = [
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
  ];

  categoryOptions:string[] = ['categoria 1', 'categoria 2', 'categoria 3'];

  filterType:string[] = ['Filtrar por mes', 'Filtrar por año'];

  months:string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];

  years:string[] = [];

  currency:string = 'ARS';

  currentPage:number = 1;
  rawsPerPage:number = 8;
  monthToFilter:string = '';
  yearToFilter:string = '';
  dataTypeToFilter:string = '';
  currentYear:number = new Date().getFullYear();


  constructor(private paginatorService: PaginatorService) {}

  ngOnInit(): void {
      this.generateYearList();
  }

  get paginatedData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.incomeList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getCurrentMonth():string {

    const currentDate = new Date();
    const currentMonth = this.months[currentDate.getMonth()];

    return currentMonth;

  }

  getDataTypeToFilter(value: string) {
    this.dataTypeToFilter = value;
  }

  getMonthToFilter(value: string) {
    this.monthToFilter = value;
  }

  getYearToFilter(value: string) {
    this.monthToFilter = value;
  }

  isYearsOrMonthsDropdown():boolean {

    if(this.dataTypeToFilter.toLocaleLowerCase() === 'filtrar por mes') return true;

    if(this.dataTypeToFilter.toLocaleLowerCase() === 'filtrar por año') return false;

    return true;

  }

  generateYearList() {

    for (let i= 0; i <= 4; i++) {
      const newYear = (this.currentYear - i).toString()
      this.years.push(newYear);
    }
  }

}
