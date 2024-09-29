import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';



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
  imports: [ CommonModule, FormsModule, PaginatorComponent],
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
}