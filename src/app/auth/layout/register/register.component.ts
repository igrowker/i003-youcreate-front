import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService, Country } from '../../../services/country.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  countries: Country[] = [];

  constructor(private fb: FormBuilder, private countryService: CountryService){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      areaCode: [{value: '', disabled: true}, Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      youtubeUsername: ['', [Validators.required]],
      twitchUsername: ['', [Validators.required]],
      youtube: [''],
      twitch: [''],
    });
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(
      (data: Country[]) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error al cargar los países', error);
      }
    );

    this.registerForm.get('country')?.valueChanges.subscribe((countryCode) => {
      const selectedCountry = this.countries.find(
      (country) => country.code === countryCode 
      );
      if(selectedCountry){
        this.registerForm.patchValue({
          areaCode: selectedCountry.areaCode
        });
      }
    });
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log('Form Submitted', this.registerForm.value)
    }else{
      console.log('Form is invalid');
    }
  }
}
