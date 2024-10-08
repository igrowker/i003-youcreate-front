import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService, Country } from '../../../services/country.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserRegister } from '../../../core/models/user-register.interface';
import { selectSocialMedia } from '../../../core/validators/social-media.validator';
import { Router } from '@angular/router';
import { concat } from 'rxjs';


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

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private auth: AuthService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],

      country: ['', [Validators.required]],
      areaCode: [{value: '', disabled: true}, Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      
      //Redes sociales
      youtube: [false],
      twitch: [false],
      youtubeUsername: ['', []],
      twitchUsername: ['', []]
      
    },{ validators: selectSocialMedia()});//Debe al menos seleccionar una red social
  
  
    this.registerForm.get('youtube')?.valueChanges.subscribe((checked: boolean) => {
      const youtubeUsername = this.registerForm.get('youtubeUsername');
      if (checked) {
        youtubeUsername?.setValidators([Validators.required]);
      } else {
        youtubeUsername?.clearValidators();
      }
      youtubeUsername?.updateValueAndValidity();
    });
    
    this.registerForm.get('twitch')?.valueChanges.subscribe((checked: boolean) => {
      const twitchUsername = this.registerForm.get('twitchUsername');
      if (checked) {
        twitchUsername?.setValidators([Validators.required]);
      } else {
        twitchUsername?.clearValidators();
      }
      twitchUsername?.updateValueAndValidity();
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
        this.registerForm.patchValue({areaCode: selectedCountry.areaCode});
      }
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {

      const userRegister: UserRegister = {
        nombre: this.registerForm.value.firstName || '',
        apellido: this.registerForm.value.lastName || '',

        email: this.registerForm.value.email || '',
        password1: this.registerForm.value.password || '',
        password2: this.registerForm.value.confirmPassword || '',

        pais_residencia: this.registerForm.value.country || '',
        redes_sociales:{
          youtube: this.registerForm.value.youtubeUsername || undefined,
          twitch: this.registerForm.value.twitchUsername || undefined,
        },
        telefono: (this.registerForm.value.areaCode || '') + (this.registerForm.value.phoneNumber || ''),
        numero_fiscal: '1',
      }

      console.log('Modelo de interfaz:',userRegister);

      this.auth.registrarse(userRegister).subscribe({
        next: (response) => {
          console.log('Registro Correcto', response);
          this.router.navigate(["/auth/verificar"]);
          //Redireccionar a cartel de correo enviado
        },

        error: (error) => {
          console.log('Error al registrarse:', error);
        }

      })

    } else {
      console.log('Form is invalid');
    }
  }







}
