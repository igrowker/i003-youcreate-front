import { Component } from '@angular/core';
//import { PaginatorService } from '../../../services/paginator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaxService } from '../../../services/tax.service';
import { TaxObligation } from '../../../core/models/tax-obligation';
//import { retryWhen } from 'rxjs';

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
        this.setearId();
        console.log(this.obligations);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }


  getStatusClass(impuesto: TaxObligation): string {
    if(impuesto.estado_pago){
      return 'green';
    }else{
      if(this.isNegative(new Date(impuesto.fecha_vencimiento)))
      return 'red';
    }
    return 'yellow';
  }
 
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

 
  setearId(){
    this.obligations.forEach( (tax,index)=>{
      tax.id = index+1;
    })
  }


  openDialog(obligation: TaxObligation): void {
    console.log("estado_pago antes de abrir el diálogo:", obligation.estado_pago);
    
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

      console.log("result:",result," result.cp:",result.confirmarPago,"id:",obligation.id);
      
      if (result && result.confirmarPago) {
        console.log("confirm payment");
        obligation.estado_pago = true;
        this.confirmPayment(obligation);
      }
    });
  }

  confirmPayment(obligation: TaxObligation) {
    const status = {estado_pago:true};
    this.tax.updateTaxStatus(obligation.id,status).subscribe({

        next: (rta) => {
          console.log( "estado de pago", rta);
          this.getTax();
        },
        error: (error) => {
          console.error('Error al confirmar pago:', error);
        },
      });
  }

  emailAutomatico(update:any){
    update.fecha_vencimiento = update.fecha_vencimiento.toString();
    const updateData = {
      ...update,
      emailAutomatico: update.emailAutomatico,
    };
    
    this.tax.updateTax(update.id,updateData).subscribe({
      next:(resp)=>{
        console.log('Actualizacion exitosa:',resp);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
