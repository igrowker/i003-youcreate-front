import { Component } from '@angular/core';
import { Collaboration, State } from '../../../core/models/collaborator-payments.interface';
import { PaginatorService } from '../../../services/paginator.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPaymentsDialogComponent } from '../../components/register-payments-dialog/register-payments-dialog.component';

@Component({
  selector: 'app-collaborator-payments',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    RegisterPaymentsDialogComponent
  ],
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
      state: 'Por pagar'
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
      state: 'Vencido'
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

  constructor( private paginatorService: PaginatorService, public dialog: MatDialog) {}

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
      case 'Por pagar':
        return 'payable';
      case 'Vencido':
        return 'expired';
      default:
        return '';
    }

  }
  openDialog(collaborator: Collaboration): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: collaborator.state !== 'Pagado' ? 'Confirmar Pago' : 'Detalle del Pago',
        message: collaborator.state !== 'Pagado' ? '¿Deseas confirmar el pago?' : 'Detalles del pago realizado.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
