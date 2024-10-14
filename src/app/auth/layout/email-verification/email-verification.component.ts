import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

type verificationCode = {
  email:string;
  otp_code:string;
}

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  code: string[] = ['', '', '', '','',''];
  showModal = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private token: TokenService
  ){}

  moveToNext(event: Event, index: number){
    const input = event.target as HTMLInputElement;
    if(input.value && index < 6){
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if(nextInput){
        nextInput.focus()
      }
    }
  }

  verifyCode(){
    
    const enteredCode =this.code.join('');
    const email = sessionStorage.getItem('email') || '';
    
    const code: verificationCode = {
      otp_code: enteredCode,
      email: email
    };

    this.auth.codeVerification(code).subscribe({
      next:(resp)=>{
        this.showModal = true
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  closeModal(){
    this.showModal = false;
    sessionStorage.clear();
    this.token.decodeToken();
    this.router.navigate(['/home']);
  }
}
