import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiTax, TaxObligation } from '../core/models/tax-obligation';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTaxes(): Observable<ApiTax> {
    return this.http.get<ApiTax>(`${this.apiUrl}api/obligaciones-fiscales/`);
  }
  // Crear una nueva obligación fiscal
  createTax(obligation: any) {
    return this.http.post(`${this.apiUrl}api/obligaciones-fiscales/`, obligation);
  }

  // Obtener una obligación fiscal por ID
  getTaxById(id: number) {
    return this.http.get(`${this.apiUrl}api/obligaciones-fiscales/${id}/`);
  }

  

  // Eliminar una obligación fiscal
  deleteTax(id: number) {
    return this.http.delete(`${this.apiUrl}api/obligaciones-fiscales/${id}/`);
  }

  // Actualizar una obligación fiscal
  updateTax(id: number, obligation: TaxObligation): Observable<TaxObligation> {
    return this.http.put<TaxObligation>(`${this.apiUrl}api/actualizacion-estados/${id}/`, obligation);
  }

  // Actualizar el estado de una obligación fiscal
  updateTaxStatus(id: number, statusUpdate: any): Observable<TaxObligation> {
    return this.http.put<TaxObligation>(`${this.apiUrl}api/actualizacion-estados/${id}/`, statusUpdate);
  }


}
