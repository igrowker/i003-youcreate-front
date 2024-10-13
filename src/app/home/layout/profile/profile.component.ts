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
      email: [''],
      photo: [null]
    });
  }

  

  ngOnInit() {
    this.getAccountData();
  }

  getAccountData(){
    this.accountService.getAccountData().subscribe({
      next:(resp) => {
        console.log(resp);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        photo: file
      });
    }
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('name', this.profileForm.get('name')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('photo', this.profileForm.get('photo')?.value);

    this.http.post('https://api.example.com/user/update', formData)
      .subscribe(response => {
        console.log('Profile updated successfully!', response);
      });
  }

  navigateTo(route: string): void {
    this.router.navigate(['/account-data']); 

  }
  

  // this.http.get('https://api.example.com/user')
    //   .subscribe(data => {
    //     this.user = data;
    //     this.profileForm.patchValue({
    //       name: this.user.name,
    //       email: this.user.email
    //     });
    //   });
}
