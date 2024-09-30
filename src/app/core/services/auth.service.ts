import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //apiUrl: string = "http://127.0.0.1:8000";

  constructor(
    private http: HttpClient
  ) { }

  register(usuario: any): Observable<any> {
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });*/
    return this.http.post<any>('http://127.0.0.1:8000/auth/register/', usuario);
  }

  
}
