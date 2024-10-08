import { Component, OnInit, signal } from '@angular/core';
import { Income, IncomeHistory } from '../../../core/models/income.interface';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorService } from '../../../services/paginator.service';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { SwapGraphicsComponent } from '../../components/specific/swap-graphics/swap-graphics.component';
import { BarGraphicComponent } from '../../components/bar-graphic/bar-graphic.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { HomeService } from '../../../services/home.service';
import { AuthService } from '../../../core/services/auth.service';
import { NumberWithDotsPipe } from '../../../shared/pipes/number-with-dots.pipe';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    BtnDropdownComponent,
    SwapGraphicsComponent,
    BarGraphicComponent,
    SpinnerComponent,
    NumberWithDotsPipe
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{

  public currency:string = 'ARS';
  public currentPage:number = 1;
  public rawsPerPage:number = 8;
  public isLoading:boolean = false;

  public currentYear:number = new Date().getFullYear();
  public monthToFilter = signal<string>('');
  public typeToFilter = signal<string>('');
  public yearToFilter = signal<string>('');

  // public income: Income[] = [
  //   {
  //     date: '05-08-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-08-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-11-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-09-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-09-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-07-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-09-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-11-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-09-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-10-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  //   {
  //     date: '05-10-2024',
  //     name: 'Juan Pérez',
  //     monto: '600.000',
  //     category: 'Tutorial Youtube',
  //     description: 'Pagado'
  //   },
  // ];

  public categoryOptions:string[] = ['categoria 1', 'categoria 2', 'categoria 3'];
  public filterType:string[] = ['Filtrar por mes', 'Filtrar por año', 'Reiniciar filtro'];
  public months:string[] = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  public dataGraficoPrueba:IncomeHistory[] = [
    {
      year:'2023',
      data:[95, 68, 50, 21, 66, 75, 60, 46, 60, 15, 97, 1]
    },
    {
      year:'2024',
      data:[65, 59, 80, 81, 56, 55, 40, 56, 10, 5, 7, 12]
    },
    {
      year:'2021',
      data:[50, 90, 70, 60, 30, 20, 40, 68, 20, 25, 37, 12]
    },
  ];
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
  public incomeList:Income[] = [];


  constructor(
    private paginatorService: PaginatorService,
    private homeService: HomeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.generateYearList();

    const {pk} = this.authService.currentUser();
    console.log(pk);

    this.homeService.getIncomeById(pk).subscribe({
      next: (resp) => {
        console.log(resp);
        this.incomeList = resp;
      }
    })
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
    if (value === 'Reiniciar filtro') {
      this.resetFilters();
    } else {
      this.typeToFilter.set(value);
    }
  }

  getMonthToFilter(month: string)  {
    this.monthToFilter.set(month)
  }

  getYearToFilter(year: string)  {
    this.yearToFilter.set(year)

    //TODO: cambiar cuando se tenga el endpoint
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  //TODO: corregir cuando esten los datos completos
  filterByMonth(): Income[] {

    if(this.monthToFilter() === '' || this.typeToFilter() === 'Reiniciar filtro' ) {
      return this.paginatedData(this.incomeList);
    }

    const monthIndex = this.months.indexOf(this.monthToFilter()) + 1;
    const monthString = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();

    const dataFiltered = this.incomeList.filter(collaborator => {
    // const incomeMonth = collaborator.date.split('-')[1];

      // return incomeMonth === monthString;
    });

    return  this.paginatedData(dataFiltered)

  }

  filterByYear():number[] {
    const year = this.yearToFilter() || '2024';

    const dataFiltered:IncomeHistory[] = this.dataGraficoPrueba.filter((history) => {
      return history.year === year;
    });

    return dataFiltered.map( history => history.data).flat();

  }

  resetFilters() {
    this.typeToFilter.set('');
    this.monthToFilter.set('');
    this.yearToFilter.set('');
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
