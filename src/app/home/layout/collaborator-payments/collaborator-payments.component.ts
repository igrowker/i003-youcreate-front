import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Collaboration } from '../../../core/models/collaborator-payments.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NumberWithDotsPipe } from '../../../shared/pipes/number-with-dots.pipe';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Payment } from '../../../core/models/payment.interface';
import { RegisterPaymentsDialogComponent } from '../../components/register-payments-dialog/register-payments-dialog.component';
import { TokenService } from '../../../core/services/token.service';

import { HomeService } from '../../../services/home.service';
import { PaginatorService } from '../../../services/paginator.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-collaborator-payments',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorComponent,
    RegisterPaymentsDialogComponent,
    SpinnerComponent,
    NumberWithDotsPipe,
  ],
  templateUrl: './collaborator-payments.component.html',
  styleUrl: './collaborator-payments.component.css'
})
export class CollaboratorPaymentsComponent {

  collaborators: Payment[] = [];
  collaboratorsHistory: Payment[] = [];

  isLoading:boolean = false;
  currency: string = 'ARS';
  currentPage: number = 1;
  currentPageHistorie: number = 1;
  rawsPerPage: number = 3;
  colaborador_id: number = 0;

  constructor(
    private paginatorService: PaginatorService,
    private homeService: HomeService,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    const { user_id } = this.tokenService.decodeToken();
    this.colaborador_id = user_id;

    this.getCollaboratorsPayment();

  }

  getCollaboratorsPayment() {

    this.isLoading = true;
    this.homeService.getCollaboratorPayments().subscribe({
      next: (resp) => {
        this.collaborators = resp;
        this.collaboratorsHistory = [...this.collaborators];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false
      }
    })
  }

  setNewPaymentRegistered(newPayment: Payment) {

    const payment = { colaborador_id: this.colaborador_id , ...newPayment };
    console.log(payment);


    this.homeService.addPayment(payment).subscribe({
      next: (payment) => {
        this.collaborators.push(payment);
        this.collaboratorsHistory = [...this.collaborators]
      },
      error: (err) => console.error(err)
    })

    this.collaboratorsData;
    this.paymentHistoryData;
  }

  get collaboratorsData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rawsPerPage, this.collaborators);
  }

  get paymentHistoryData() {
    return this.paginatorService.paginatedData(this.currentPageHistorie, this.rawsPerPage, this.collaboratorsHistory);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onHistoriePageChange(page: number) {
    this.currentPageHistorie = page;
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

  getStateColor( date: string ) {

    const isExpired = this.isDateExpired(date);

    switch(isExpired) {
      case false:
        return 'payable';
      case true:
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
