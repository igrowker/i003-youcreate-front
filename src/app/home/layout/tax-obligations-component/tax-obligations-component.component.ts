import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
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
  imports: [ CommonModule, FormsModule, PaginatorComponent, ConfirmDialogComponent],
  templateUrl: './tax-obligations-component.component.html',
  styleUrl: './tax-obligations-component.component.css',
 

})
export class TaxObligationsComponentComponent  {
  obligations: TaxObligation[] = [ {
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
  }
 ]



  currentPage: number = 1;
  rowsPerPage: number = 5;

  constructor(private dialog: MatDialog) {} 

  get paginatedObligations(): TaxObligation[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.obligations.slice(start, start + this.rowsPerPage);
  }
 
  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

   /* constructor(private http: HttpClient) {}

 ngOnInit(): void {
    this.getTaxObligations();
  }

 getTaxObligations(): void {
    this.http.get<TaxObligation[]>('https://api.example.com/obligaciones-fiscales')
      .subscribe(data => {
        this.obligations = data;
      });
  }*/

  getStatusClass(paymentStatus : 'paid' | 'pending' | 'overdue'): string {
    if (paymentStatus  === 'paid') {
      return 'green';
    } else if (paymentStatus  === 'pending') {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  openDialog(obligation: TaxObligation): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: obligation.paymentStatus !== 'paid' ? 'Confirmar Pago' : 'Detalle del Pago',
        message: obligation.paymentStatus !== 'paid' ? '¿Deseas confirmar el pago?' : 'Detalles del pago realizado.'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Manejar la lógica después de que el diálogo se cierra, si es necesario
        console.log('Pago confirmado para:', obligation);
      }
    });
  }

}