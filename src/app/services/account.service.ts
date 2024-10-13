import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private getAccountUrl = `${environment.apiUrl}auth/user/account-data/`;
  private updateAccountUrl = `${environment.apiUrl}auth/user/update/`;

  constructor(private http: HttpClient) {}

  getAccountData(): Observable<any> {
    return this.http.get<any>(this.getAccountUrl);
  }

  updateAccountData(data: any): Observable<any> {
    return this.http.put<any>(this.updateAccountUrl, data);
  }
}
