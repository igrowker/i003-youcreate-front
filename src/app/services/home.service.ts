import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Income } from '../core/models/income.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*************Endpoints Ingresos*****************/
  getIncomeById(id: number): Observable<Income[]> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos/${id}`);
  }

  getMonthlyIncome(id: number, month: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-por-mes/${id}/${month}`);
  }

  getAnnualIncome(id: number, year: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-por-anio/${id}/${year}`);
  }

  getTotalIncome(id: number):Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-totales/${id}`)
      .pipe(
        map( ({total}) => total)
      )
  }

  /*************Endpoints Pagos-Colaboradores*****************/


}
