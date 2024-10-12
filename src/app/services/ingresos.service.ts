import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Income } from '../core/models/income.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //ARREGLOS DE INGRESOS

 //  `GET /ingresos/<int:usuario_id>/` - Listar todos los ingresos de un usuario 
  getAllIngresos(userId: number): Observable <Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/api/ingresos/${userId}`);
  }

  // * `GET /ingresos-de-un-mes/<int:usuario_id>/<int:mes>/<int:anio>/` - Obtener los ingresos de un usuario por mes y año
  getIngresosDelMes(userId: number, mes: number, anio: number):Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/api/ingresos-de-un-mes/${userId}/${mes}/${anio}`);
  }

  // * `GET /ingresos-de-un-anio/<int:usuario_id>/<int:anio>/` - Obtener los ingresos de un usuario por año
  getIngresosDelAnio(userId: number, anio: number):Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/api/ingresos-de-un-anio/${userId}/${anio}`);
  }


  //TOTALES

  // * `GET /ingresos-totales/<int:usuario_id>/` - Obtener el total de ingresos de un usuario
  getTotalIngresos(userId: number):Observable <any>{
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-totales/${userId}`);
  }


  // * `GET /ingreso-total-en-un-mes/<int:usuario_id>/<int:mes>/<int:anio>/` - Obtener el total de ingresos de un usuario por mes y año
  getTotalDelMes(userId: number, mes: number, anio: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-total-en-un-mes/${userId}/${mes}/${anio}`);
  }


  // * `GET /ingreso-total-en-un-anio/<int:usuario_id>/<int:anio>/` - Obtener el total de ingresos de un usuario por año
  getTotalDelAnio(userId: number, anio: number) {
    return this.http.get<any>(`${this.apiUrl}/api/ingresos-total-en-un-anio/${userId}/${anio}`);
  }


  //NUEVO INGRESO

  // * `POST /ingresos/` - Crear un nuevo ingreso
  postIngreso(newIncome: Income):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/ingresos`,newIncome)
      .pipe(
        catchError( err => {
          console.error('An error occurred:', err);
          return throwError(()=>new Error('No se pudo crear el ingreso'));
        })
      );
  }

}
