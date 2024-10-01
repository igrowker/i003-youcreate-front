import { Component } from '@angular/core';
import { Collaboration, State } from '../../../core/models/collaborator-payments.interface';
import { PaginatorService } from '../../../services/paginator.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPaymentsDialogComponent } from '../../components/register-payments-dialog/register-payments-dialog.component';
import { NumberWithDotsPipe } from '../../../shared/pipes/number-with-dots.pipe';

@Component({
  selector: 'app-collaborator-payments',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    RegisterPaymentsDialogComponent,
    NumberWithDotsPipe
  ],
  templateUrl: './collaborator-payments.component.html',
  styleUrl: './collaborator-payments.component.css'
})
export class CollaboratorPaymentsComponent {


  collaborators: Collaboration[] = [
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      service: 'Tutorial Youtube',
      monto: 600000,
      state: 'Por pagar'
    },
    {
      date: '05/09/2024',
      name: 'Sofia Caldero',
      service: 'Patrocinio Stream',
      monto: 400000,
      state: 'Por pagar'
    },
    {
      date: '05/09/2024',
      name: 'Lucas Morales',
      service: 'Video Review',
      monto: 500000,
      state: 'Vencido'
    },
    {
      date: '05/09/2024',
      name: 'Jose Medina',
      service: 'Pauta Publicitaria',
      monto: 1000000,
      state: 'Por pagar'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      service: 'Tutorial Youtube',
      monto: 600000,
      state: 'Vencido'
    },
  ];

  collaboratorsHistorie: Collaboration[] = [
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      service: 'Tutorial Youtube',
      monto: 600000,
      wallet: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Sofia Caldero',
      service: 'Patrocinio Stream',
      monto: 400000,
      wallet: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Lucas Morales',
      service: 'Video Review',
      monto: 500000,
      wallet: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Jose Medina',
      service: 'Pauta Publicitaria',
      monto: 1000000,
      wallet: 'Transferencia Bancaria'
    },
    {
      date: '05/09/2024',
      name: 'Juan Pérez',
      service: 'Tutorial Youtube',
      monto: 600000,
      wallet: 'Transferencia Bancaria'
    },
  ]

  currency: string = 'ARS';
  currentPage: number = 1;
  currentPageHistorie: number = 1;
  rawsPerPage: number = 3;

  constructor( private paginatorService: PaginatorService, public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  get collaboratorsData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.collaborators);
  }

  get paymentHistoryData() {
    return this.paginatorService.paginatedData(this.currentPageHistorie, this.rawsPerPage, this.collaboratorsHistorie);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onHistoriePageChange(page: number) {
    this.currentPageHistorie = page;
  }

  setNewPaymentRegistered(newPayment: Collaboration) {

    this.isDateExpired(newPayment.date) ? newPayment.state = 'Vencido' : newPayment.state = 'Por pagar';

    this.collaborators.push(newPayment)
    this.collaboratorsData;
  }

  isDateExpired(date: string): boolean {

    const newDate = date.split('-');
    const month = this.adjustMonth(newDate[1]);

    const inputDate = new Date(+newDate[0], month, +newDate[2]);
    const currentDate = new Date();

    inputDate.setHours(0,0,0,0);
    currentDate.setHours(0,0,0,0);

    return inputDate < currentDate;
  }

  adjustMonth(month: string):number {
    const cleanCero = Number(month.replace(/^0/, ''));
    const adjustedMonth = cleanCero - 1;

    return adjustedMonth;
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
