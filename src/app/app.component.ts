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

  usuario1 = {
    "nombre": "ddd",
    "apellido": "dddd",
    "email": "ggg@gmail.com",
    "password1": "ACNM0000",
    "password2": "ACNM0000",
    "pais_residencia": "AR",
    "redes_sociales": {"instagram": "@dam"}
  }

  usuario2 = {
    "nombre": "eee",
    "apellido": "eeee",
    "email": "hhh@gmail.com",
    "password1": "BCNM0000",
    "password2": "BCNM0000",
    "pais_residencia": "AR",
    "redes_sociales": {"instagram": "@dam"}
  }

  usuario3 = {
    "nombre": "fff",
    "apellido": "ffff",
    "email": "iii@gmail.com",
    "password1": "CCNM0000",
    "password2": "CCNM0000",
    "pais_residencia": "AR",
    "redes_sociales": {"instagram": "@dam"},
    "numero_fiscal": "123456"
  }
  

  constructor(
    private token: TokenService,
    private http: HttpClient
  )
  {}

  registro(){
    this.http.post<any>( this.url+`auth/registration/`, this.usuario2 ).subscribe( res =>{
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
