import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-angular-ts';



  usuario = {
    "nombre": "Damian",
    "apellido": "Lamb",
    "correo": "damian1@gmail.com",
    "password": "ACNM0000",
    "password2": "ACNM0000",
    "pais_residencia": "AR",
    "redes_sociales": {
      "instagram": "@dami"
    }
  };


  constructor(
    //private auth: AuthService
  )
  {}

  // registrarse(){
  //   this.auth.register( this.usuario ).subscribe({
  //     next:(datos)=>{
  //       console.log('Registrado',datos);
  //     },

  //     error:(datos)=>{
  //       console.error('Error en registro:',datos);
  //     }
  //   });
  // }
  
}
