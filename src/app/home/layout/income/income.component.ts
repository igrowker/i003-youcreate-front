import { Component } from '@angular/core';
import { Income } from '../../../core/models/income.interface';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorService } from '../../../services/paginator.service';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    PaginatorComponent,
    DoughnutChartComponent,
    BtnDropdownComponent
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {

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

  categoryOptions:string[] = ['categoria 1', 'categoria 2', 'categoria 3',]

  currency:string = 'ARS';

  currentPage:number = 1;
  rawsPerPage:number = 8;

  constructor(private paginatorService: PaginatorService) {}

  get paginatedData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.incomeList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

}
