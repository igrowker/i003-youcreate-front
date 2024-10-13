import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor() { }

  //Metodos de token de acceso
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUserId():number{
    const id = this.decodeToken();
    return id.user_id;
  }

  decodeToken(): any {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      console.log('Token invalido', error);
      return null;
    }

  }

  //Metodos de token de refresh
  saveRefreshToken( refreshToken:string ):void{
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getRefreshToken(): string | null{
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  clearRefreshToken():void{
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }


}
