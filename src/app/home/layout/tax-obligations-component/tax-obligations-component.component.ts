import { Component } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaxService } from '../../../services/tax.service';

interface TaxObligation {
  id: number;
  type: string;
  amount: number;
  dueDate: Date;
  notification: boolean;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

@Component({
  selector: 'app-tax-obligations-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginatorComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './tax-obligations-component.component.html',
  styleUrl: './tax-obligations-component.component.css',
})
export class TaxObligationsComponentComponent {
  obligations: TaxObligation[] = [];

  currency: string = 'ARS';
  currentPage: number = 1;
  rowsPerPage: number = 4;

  constructor(
    private paginatorService: PaginatorService,
    public dialog: MatDialog,
    private tax: TaxService
  ) {}

  ngOnInit(): void {
    this.getTax();
  }
  getTax() {
    this.tax.getTaxes().subscribe({
      next: (data) => {
        //console.log(data);
        this.obligations = data;
       // console.log(this.obligations);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  get obligationsData() {
    return this.paginatorService.paginatedData(
      this.currentPage,
      this.rowsPerPage,
      this.obligations
    );
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  getStatusClass(paymentStatus: 'paid' | 'pending' | 'overdue'): string {
    // Clase para colorear las filas en función del estado del pago (green, yellow, red)
    //if? funcion numeronegativo a parte...
    switch (paymentStatus) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'overdue':
        return 'red';
      default:
        return '';
    }
  }
  // funcion para calcular las fechas, recibe una fecha y saca una fecha actual () actual vencido- mayor falta dias para pagar-
  getDaysToPay(dueDate: Date): number {
    const now = new Date();
    const diffDays = Math.ceil(
      (dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );
    return diffDays;
  }

  isNegative(day: Date) {
    if (this.getDaysToPay(day) < 0) {
      return true;
    }

    return false;
  }

  //true os false booleano, numero negativo - if(numeroNegativo){return red}else{return yellow}

  openDialog(obligation: TaxObligation): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:
          obligation.paymentStatus !== 'paid'
            ? 'Confirmar Pago'
            : 'Detalle del Pago',
        message:
          obligation.paymentStatus !== 'paid'
            ? '¿Deseas confirmar el pago?'
            : 'Detalles del pago realizado.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && obligation.paymentStatus !== 'paid') {
        this.confirmPayment(obligation.id);
      }
    });
  }
  confirmPayment(obligationId: number) {
    this.tax
      .updateTaxStatus(obligationId, { paymentStatus: 'paid' })
      .subscribe({
        next: () => {
          this.getTax();
        },
        error: (error) => {
          console.error('Error al confirmar pago:', error);
        },
      });
  }
}
