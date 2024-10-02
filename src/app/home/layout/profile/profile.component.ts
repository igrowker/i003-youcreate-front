import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule]
})
export class ProfileComponent /*implements OnInit */{
  user: any = {};
  profileForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      photo: [null]
    });
  }

 /* ngOnInit(): void {
    this.http.get('https://api.example.com/user')
      .subscribe(data => {
        this.user = data;
        this.profileForm.patchValue({
          name: this.user.name,
          email: this.user.email
        });
      });
  }*/

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
    this.router.navigate([route]);
  }
}
