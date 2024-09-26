import { Component } from '@angular/core';
import { Income } from '../../../core/models/income.interface';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorService } from '../../../services/paginator.service';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ PaginatorComponent, DoughnutChartComponent ],
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

  currency:string = 'ARS';

  currentPage:number = 1;
  rawsPerPage:number = 8;

  constructor(private paginatorService: PaginatorService) {}

  get incomeData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.incomeList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
