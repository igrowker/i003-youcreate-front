import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog'; 
import { Card } from '../../../../core/models/card.interface';
import { CurrencyPipe } from '@angular/common';

interface CardData {
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [ConfirmDialogComponent,CurrencyPipe],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css'
})
export class CardDashboardComponent implements OnInit{
  
  @Input() datos!:Card;

  constructor(private dialog: MatDialog) {} 
  
  ngOnInit(): void {
    
  }

  cardData: CardData = {
    paymentStatus: 'pending' 
  };

  openDialog(action: 'details' | 'pay'): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: action === 'pay' ? 'Confirmar Pago' : 'Detalle del Pago',
        message: action === 'pay'
          ? '¿Deseas confirmar el pago de este impuesto?'
          : this.datos.details
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && action === 'pay') {
      
        //console.log('Pago confirmado para:', this.cardData);
      }
    });
  }


}
