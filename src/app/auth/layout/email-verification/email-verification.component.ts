import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  code: string[] = ['', '', '', '']
  generatedCode = '123456';
  showModal = false

  constructor(
    private router: Router,
    private auth: AuthService
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
/*
  verifyCode(){
    const enteredCode = this.code.join('');
    if(enteredCode === this.generatedCode){
      this.showModal = true
      console.log("Codigo correcto");
    }else{
      alert('Código incorrecto, por favor trata de nuevo')
    }
  }
*/

  verifyCode(){
    const enteredCode =this.code.join('');
    this.auth.codeVerification(enteredCode).subscribe({
      next:(resp)=>{
        console.log(resp);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }




  closeModal(){
    this.showModal = false;
    this.router.navigate(['/home']);
  }
}
