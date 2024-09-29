import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog'; 

interface CardData {
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css'
})
export class CardDashboardComponent {
  
  constructor(private dialog: MatDialog) {} 

  cardData: CardData = {
    paymentStatus: 'pending' 
  };

  openDialog(action: 'details' | 'pay'): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: action === 'pay' ? 'Confirmar Pago' : 'Detalle del Pago',
        message: action === 'pay'
          ? '¿Deseas confirmar el pago de este impuesto?'
          : 'Detalles del impuesto seleccionado.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && action === 'pay') {
      
        //console.log('Pago confirmado para:', this.cardData);
      }
    });
  }


}
