import { Component } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface TaxObligation {
  type: string;
  amount: number;
  dueDate: Date;
  notification: boolean;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

@Component({
  selector: 'app-tax-obligations-component',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorComponent, ConfirmDialogComponent],
  templateUrl: './tax-obligations-component.component.html',
  styleUrl: './tax-obligations-component.component.css',
})
export class TaxObligationsComponentComponent  {
  obligations: TaxObligation[] = [
    {
      type: 'MONOBRUTO',
      amount: 140000,
      dueDate: new Date('2024-11-10'),
      notification: true,
      paymentStatus: 'pending',
    },
    {
      type: 'IVA',
      amount: 350000,
      dueDate: new Date('2024-11-30'),
      notification: false,
      paymentStatus: 'overdue',
    },
    {
      type: 'IMP',
      amount: 1000000,
      dueDate: new Date('2024-12-01'),
      notification: true,
      paymentStatus: 'paid',
    },
    {
      type: 'IMP',
      amount: 25000,
      dueDate: new Date('2024-09-30'),
      notification: true,
      paymentStatus: 'pending',
    },
    {
      type: 'IMP',
      amount: 1000000,
      dueDate: new Date('2024-12-01'),
      notification: true,
      paymentStatus: 'paid',
    },
    {
      type: 'IMP',
      amount: 25000,
      dueDate: new Date('2024-09-30'),
      notification: true,
      paymentStatus: 'pending',
    },
    
  ];

  currency: string = 'ARS';
  currentPage: number = 1;
  rowsPerPage: number = 4;

  constructor(private paginatorService: PaginatorService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  get obligationsData() {
    return this.paginatorService.paginatedData(this.currentPage, this.rowsPerPage, this.obligations);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
}


  getStatusClass(paymentStatus: 'paid' | 'pending' | 'overdue'): string {
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

  openDialog(obligation: TaxObligation): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: obligation.paymentStatus !== 'paid' ? 'Confirmar Pago' : 'Detalle del Pago',
        message: obligation.paymentStatus !== 'paid' ? '¿Deseas confirmar el pago?' : 'Detalles del pago realizado.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
    
        // Lógica de pago aquí
   
    });
  }
}
