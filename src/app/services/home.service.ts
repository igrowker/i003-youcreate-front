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

  getIncomeById(id: number): Observable<Income[]> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos/${id}`)
  }

  getMonthlyIncome(id: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-por-mes/${id}`)
  }

  getAnnualIncome(id: number) {
    return this.http.get(`${this.apiUrl}/api/ingresos-por-anio/${id}`)
  }

  getTotalIncome(id: number) {
    return this.http.get(`${this.apiUrl}/api/ingresos-totales/${id}`)
  }

}
