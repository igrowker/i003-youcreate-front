import { Component } from '@angular/core';
import { Collaboration, State } from '../../../core/models/collaborator-payments.interface';
import { PaginatorService } from '../../../services/paginator.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaborator-payments',
  standalone: true,
  imports: [ PaginatorComponent, CommonModule ],
  templateUrl: './collaborator-payments.component.html',
  styleUrl: './collaborator-payments.component.css'
})
export class CollaboratorPaymentsComponent {


  collaborators: Collaboration[] = [
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      servicio: 'Tutorial Youtube',
      monto: '600.000',
      state: 'Pagado'
    },
    {
      date: '05/09/2024',
      name: 'Sofia Caldero',
      servicio: 'Patrocinio Stream',
      monto: '400.000',
      state: 'Por pagar'
    },
    {
      date: '05/09/2024',
      name: 'Lucas Morales',
      servicio: 'Video Review',
      monto: '500.000',
      state: 'Vencido'
    },
    {
      date: '05/09/2024',
      name: 'Jose Medina',
      servicio: 'Pauta Publicitaria',
      monto: '1.000.000',
      state: 'Por pagar'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      servicio: 'Tutorial Youtube',
      monto: '600.000',
      state: 'Pagado'
    },
  ];

  collaboratorsHistorie: Collaboration[] = [
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      servicio: 'Tutorial Youtube',
      monto: '600.000',
      paymentMethod: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Sofia Caldero',
      servicio: 'Patrocinio Stream',
      monto: '400.000',
      paymentMethod: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Lucas Morales',
      servicio: 'Video Review',
      monto: '500.000',
      paymentMethod: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Jose Medina',
      servicio: 'Pauta Publicitaria',
      monto: '1.000.000',
      paymentMethod: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      servicio: 'Tutorial Youtube',
      monto: '600.000',
      paymentMethod: 'Transferencia Bancaria'
    },
  ]

  currency: string = 'ARS';
  currentPage: number = 1;
  rawsPerPage: number = 3;

  constructor( private paginatorService: PaginatorService) {}

  ngOnInit(): void {

  }

  get collaboratorsData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.collaborators);
  }

  get paymentHistoryData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.collaboratorsHistorie);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getStateColor( state: State ) {
    switch(state) {
      case 'Pagado':
        return 'paid';
      case 'Por pagar':
        return 'payable';
      case 'Vencido':
        return 'expired';
      default:
        return '';
    }
  }
}
