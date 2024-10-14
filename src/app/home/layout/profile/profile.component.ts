import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink]
})
export class ProfileComponent implements OnInit {

 

  

  user: any = {};
  profileForm: FormGroup;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder, 
    private accountService: AccountService) 
    {
    this.profileForm = this.fb.group({
      name: [''],
      email: ['']
     
    });
  }

  

  ngOnInit() {
    this.getAccountData();
  }

  getAccountData() {
    this.accountService.getAccountData().subscribe({
      next: (resp) => {
        this.user = {
          nombreCompleto: resp.nombre_completo,  
          email: resp.email
        };
      },
     
    });
  
  }
  navigateTo(route: string): void {
    this.router.navigate(['/account-data']); 

  }
  

  
}
