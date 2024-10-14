import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }


  getAccountData(): Observable<any> {
    const url = `${this.apiUrl}/auth/user/account-data/`;  
    return this.http.get<any>(url);
  }
}