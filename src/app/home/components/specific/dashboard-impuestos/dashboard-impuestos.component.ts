import { Component, OnInit } from '@angular/core';
import { CardDashboardComponent } from "../../common/card-dashboard/card-dashboard.component";
import { Card } from '../../../../core/models/card.interface';
import { TaxService } from '../../../../services/tax.service';
import { TaxObligation } from '../../../../core/models/tax-obligation';

@Component({
  selector: 'app-dashboard-impuestos',
  standalone: true,
  imports: [CardDashboardComponent],
  templateUrl: './dashboard-impuestos.component.html',
  styleUrl: './dashboard-impuestos.component.css'
})
export class DashboardImpuestosComponent implements OnInit {
  valores : Card[] = [];
  impuestos : TaxObligation[] = [];

  constructor(
    private taxService: TaxService
  ){}

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.taxService.getTaxes().subscribe({
      next:(rta)=>{
        this.setearValores(rta.obligaciones);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  setearValores(taxes: TaxObligation[]){
    taxes.forEach((tax,index)=>{
      if (!this.valores[index]) {
        // Inicializa el objeto en el índice si no existe
        this.valores[index] = {
          title: '',
          monto: 0,
          vencimiento: '',
          details: ''
        };
      }
      this.valores[index].title = tax.tipo_impuesto;
      this.valores[index].monto = parseFloat(tax.monto_a_pagar);
      this.valores[index].vencimiento = tax.fecha_vencimiento.toString();
      this.valores[index].details = this.detalles(tax.email_automatico,tax.estado_pago);
    });
  }

  detalles(email:boolean, estado:boolean){
    const emailStr = email? 'Email automatico activado': 'Email automatico desactivado';
    const estadoStr = estado?'Impuesto pagado':'Impuesto pendiente';
    return`${emailStr}, ${estadoStr}`
  }

}
