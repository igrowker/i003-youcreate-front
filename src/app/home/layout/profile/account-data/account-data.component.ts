import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-data',
  standalone: true,
  imports: [],
  templateUrl: './account-data.component.html',
  styleUrl: './account-data.component.css'
})
export class AccountDataComponent {
  editAccount() {
    console.log('Editar datos de la cuenta');
    // Aquí puedes hacer la llamada a tu API para editar los datos
   
  }

}
