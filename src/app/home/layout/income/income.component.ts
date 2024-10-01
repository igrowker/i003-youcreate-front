import { Component, OnInit, signal } from '@angular/core';
import { Income } from '../../../core/models/income.interface';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorService } from '../../../services/paginator.service';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { SwapGraphicsComponent } from '../../components/specific/swap-graphics/swap-graphics.component';
import { BarGraphicComponent } from '../../components/bar-graphic/bar-graphic.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    BtnDropdownComponent,
    SwapGraphicsComponent,
    BarGraphicComponent
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{

  public currency:string = 'ARS';
  public currentPage:number = 1;
  public rawsPerPage:number = 8;
  public yearToFilter:string = '';

  public currentYear:number = new Date().getFullYear();
  public monthToFilter = signal<string>('');
  public typeToFilter = signal<string>('');

  public incomeList: Income[] = [
    {
      date: '05-08-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-08-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-11-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-09-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-09-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-07-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-09-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-11-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-09-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-10-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
    {
      date: '05-10-2024',
      name: 'Juan Pérez',
      monto: '600.000',
      category: 'Tutorial Youtube',
      description: 'Pagado'
    },
  ];

  public categoryOptions:string[] = ['categoria 1', 'categoria 2', 'categoria 3'];
  public filterType:string[] = ['Filtrar por mes', 'Filtrar por año', 'Reiniciar filtro'];
  public months:string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  public dataGraficoPrueba = [65, 59, 80, 81, 56, 55, 40, 56, 10, 5, 7, 12];
  public barStyles = [
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
  public years:string[] = [];


  constructor(private paginatorService: PaginatorService) {}

  ngOnInit(): void {
    this.generateYearList();
  }

  paginatedData(dataList: Income[]):Income[] {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, dataList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getCurrentMonth():string {

    const currentDate = new Date();
    const currentMonth = this.months[currentDate.getMonth()];

    return currentMonth;

  }

  getTypeToFilter(value: string) {
    if (value === 'Reiniciar Filtro') {
      this.resetFilters();
    } else {
      this.typeToFilter.set(value);
    }
  }

  getMonthToFilter(month: string)  {
    this.monthToFilter.set(month)
  }

  filterByMonth(): Income[] {

    if(this.monthToFilter() === '' || this.typeToFilter() === 'Reiniciar filtro' ) {
      return this.paginatedData(this.incomeList);
    }

    const monthIndex = this.months.indexOf(this.monthToFilter()) + 1;
    const monthString = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();

     const dataFiltered = this.incomeList.filter(collaborator => {
      const incomeMonth = collaborator.date.split('-')[1];

      return incomeMonth === monthString;
    });

    return  this.paginatedData(dataFiltered)

  }

  resetFilters() {
    this.typeToFilter.set('');
    this.monthToFilter.set('');
    this.yearToFilter = '';
  }


  generateYearList() {

    for (let i= 0; i <= 4; i++) {
      const newYear = (this.currentYear - i).toString()
      this.years.push(newYear);
    }
  }

  isYearsOrMonthsDropdown():boolean {

    if(this.typeToFilter().toLocaleLowerCase() === 'filtrar por mes') return true;

    if(this.typeToFilter().toLocaleLowerCase() === 'filtrar por año') return false;

    return true;

  }

}
