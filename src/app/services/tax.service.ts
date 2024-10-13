import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { 




  }

  getTaxes() {
    return this.http.get<any[]>(`${this.apiUrl}api/obligaciones-fiscales/`);


  }
// Crear una nueva obligación fiscal
createTax(obligation: any) {
  return this.http.post(`${this.apiUrl}api/obligaciones-fiscales/`, obligation);
}

// Obtener una obligación fiscal por ID
getTaxById(id: number) {
  return this.http.get(`${this.apiUrl}api/obligaciones-fiscales/${id}/`);
}

// Actualizar una obligación fiscal
updateTax(id: number, obligation: any) {
  return this.http.put(`${this.apiUrl}api/obligaciones-fiscales/${id}/`, obligation);
}

// Eliminar una obligación fiscal
deleteTax(id: number) {
  return this.http.delete(`${this.apiUrl}api/obligaciones-fiscales/${id}/`);
}

// Actualizar el estado de una obligación fiscal
updateTaxStatus(id: number, statusUpdate: any) {
  return this.http.post(`${this.apiUrl}api/actualizacion-estados/${id}/`, statusUpdate);
}


}
