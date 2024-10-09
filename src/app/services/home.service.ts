import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Income } from '../core/models/income.interface';
import { Payment } from '../core/models/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*************Endpoints Ingresos*****************/
  getIncomeById(id: number): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/api/ingresos/${id}`);
  }

  getTotalIncome(id: number):Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-totales/${id}`)
      .pipe(
        map( ({total}) => total)
      )
  }

  getMonthlyIncome(id: number, month: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-por-mes/${id}/${month}`);
  }

  getAnnualIncome(id: number, year: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-por-anio/${id}/${year}`);
  }

  /*************Endpoints Pagos-Colaboradores*****************/
  getCollaboratorPayments(): Observable<Payment[]> {
    return this.http.get<any>(`${this.apiUrl}/api/pagos-colaboradores/`)
      .pipe(
        map( ({results}) => results )
      )
  }

  addPayment(newPayment: Payment):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/pagos-colaboradores/`, newPayment);
  }

  editPayment(payment: any):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/pagos-colaboradores/`, payment);
  }

  /**********************************************************/

}
