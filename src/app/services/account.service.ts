import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl = environment.apiUrl;

  constructor(
    private http :HttpClient
  ) { }

  getAccountData(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}auth/user/account-data/`);
  }
}
