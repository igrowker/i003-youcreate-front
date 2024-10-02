import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from './core/services/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title= 'titulo';

  token1 = 'token1';
  token2 = 'token2';
  token3 = 'token3';
  token4 = 'token4';
  token5 = 'token5';

  private url = 'http://127.0.0.1:8000/';

  usuario = {
    "nombre": "dami",
    "apellido": "Lamb",
    "correo": "dami@gmail.com",
    "password": "3CNM0000",
    "password2": "3CNM0000",
    "pais_residencia": "AR",
    "redes_sociales": {"instagram": "@dam"}
  }
  

  constructor(
    private token: TokenService,
    private http: HttpClient
  )
  {}

  registro(){
    this.http.post<any>( this.url+`auth/register/`, this.usuario ).subscribe( res =>{
      console.log(res.status);
      console.log(res.body);
    });
  }



  guardarToken():void {
    this.token.saveToken(this.token1);
    this.token.saveRefreshToken(this.token2);
  }
  
  verTokens(){
    console.log(this.token.getToken(),this.token.getRefreshToken());
  }

  limpiar(){
    this.token.clearToken();
    this.token.clearRefreshToken();
  }
  
}
