import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly refreshTokenUrl = ''; //Url para enviar el token de refresco y solicitar un nuevo token de acceso
  private refreshTokenInterval: any;


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }





  startRefreshTokenTimer(): void {
    this.refreshTokenInterval = setInterval(() => {

      this.refreshToken().subscribe({
        next: (tokens)=>{
          console.log('Token refrescado');
        },
        error: (error)=>{
          console.log('Error al intentar refrescar token', error);
        }
      })

    }, 240000);
  }

  refreshToken(): Observable<any> {

    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post(this.refreshTokenUrl, { refreshToken }).pipe(// Este post debe regresar el nuevo token y refresh token

      tap((tokens: any) => {
        this.tokenService.saveToken(tokens.accesToken);
        this.tokenService.saveRefreshToken(tokens.refreshToken);
      })
    );
  }


  stopRefreshTokenTimer(): void{
    clearInterval(this.refreshTokenInterval);
  }

  logout(): void{
    this.stopRefreshTokenTimer();
    this.tokenService.clearToken();
    this.tokenService.clearRefreshToken();
  }


}
