import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

type loginBody = {
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly refreshTokenUrl = ''; //Url para enviar el token de refresco y solicitar un nuevo token de acceso
  private refreshTokenInterval: any;
  private url = environment.apiUrl;
  private _currentUser = signal<any|null>(null);

  public currentUser = computed( () => this._currentUser() )

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  registrarse( user : any ): Observable<any> {
    return this.http.post<any>( `${this.url}auth/registration/`,user);
  }



  login( loginBody:loginBody ): Observable<any> {
    return this.http.post<any>( `${this.url}auth/login/`,loginBody)
       .pipe(
         map(({access, refresh, user}) => {

           //*Se guardan los tokens en localstorage
           this.tokenService.saveToken(access);
           this.tokenService.saveRefreshToken(refresh)

           //*Retorna la información del usuario
           this._currentUser.set(user)
           return user;
         }),

         catchError ( error => throwError( () =>  error))
       )
  }

  codeVerification(code: string): Observable<any> {
    return this.http.post<any>(`${this.url}auth/2fa-verify/`, { code })
      .pipe(
        map(({ access, refresh, user }) => {
          this.tokenService.saveToken(access);
          this.tokenService.saveRefreshToken(refresh)

          //*Retorna la información del usuario
          this._currentUser.set(user)
          return user;
        }),

        catchError(error => throwError(() => error))
      )
  }


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
