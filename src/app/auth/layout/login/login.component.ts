import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (resp) => {
            console.log(resp);

            sessionStorage.setItem('email',this.loginForm.value.email);
            
            this.router.navigateByUrl('/auth/verificar');
          },
          error: (message) => {
            console.log(message);
          }
        })

    }else{
      console.log('Datos no Incorrectos')
    }
  }
}
