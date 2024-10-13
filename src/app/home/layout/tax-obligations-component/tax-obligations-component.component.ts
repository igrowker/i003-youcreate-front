import { Component } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaxService } from '../../../services/tax.service';
import { TaxObligation } from '../../../core/models/tax-obligation';

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
    //private paginatorService: PaginatorService,
    public dialog: MatDialog,
    private tax: TaxService
  ) {}

  ngOnInit(): void {
    this.getTax();
  }
  getTax() {
    this.tax.getTaxes().subscribe({
      next: (data) => {
        this.obligations = data.obligaciones;
        console.log(this.obligations);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  getStatusClass(paymentStatus: boolean): string {
    // Clase para colorear las filas en función del estado del pago (green, yellow, red)
    //if? funcion numeronegativo a parte...
    if(paymentStatus){
      return 'green';
    }else{
      return 'yellow';
    }
    // switch (paymentStatus) {
    //   case 'paid':
    //     return 'green';
    //   case 'pending':
    //     return 'yellow';
    //   case 'overdue':
    //     return 'red';
    //   default:
    //     return '';
    // }
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
          obligation.estado_pago
            ? 'Confirmar Pago'
            : 'Detalle del Pago',
        message:
          obligation.estado_pago
            ? '¿Deseas confirmar el pago?'
            : 'Detalles del pago realizado.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && obligation.estado_pago) {
        this.confirmPayment(obligation.id);
      }
    });
  }
  confirmPayment(obligationId: number) {
    this.tax
      .updateTaxStatus(obligationId, { paymentStatus: true })
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
