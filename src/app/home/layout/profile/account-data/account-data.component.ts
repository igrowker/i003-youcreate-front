import { ChangeDetectorRef, Component } from '@angular/core';

import { CommonModule, KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';


type RedesSociales = {youtube?: string; twitch?: string}


@Component({
  selector: 'app-account-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,KeyValuePipe],
  templateUrl: './account-data.component.html',
  styleUrl: './account-data.component.css'
})


export class AccountDataComponent {
  accountData: any = {
    nombre_completo: '',
    email: '',
    pais_residencia: '',
    telefono: '',
    redes_sociales: {}
  };

  //keys: string[] = []

  isEditing: boolean = false;

  constructor(private accountService: AccountService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.accountService.getAccountData().subscribe( {

      
     // console.log('Datos recibidos:', data);
     next: (data) => {
      this.accountData = {
        nombre_completo: data.nombre_completo || '',
        email: data.email || '',
        pais_residencia: data.pais_residencia || '',
        telefono: data.telefono || '',
        redes_sociales: data.redes_sociales || {},
      };
     // this.keys = Object.keys(this.accountData.redes_sociales);
      //console.log('Datos de la cuenta:', this.accountData);
    },
    error: (error) => {
      console.error('Error al obtener los datos de la cuenta:', error);
    },
    complete: () => {
      console.log('Datos de la cuenta cargados completamente.');
    }
  });

}
  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveAccount() {
    this.accountService.updateAccountData(this.accountData).subscribe(response => {
      console.log('Datos actualizados:', response);
      this.isEditing = false; 
      this.cdr.markForCheck();
    },

    (err) => {
      console.error('Error al actualizar los datos:', err);
      alert('Hubo un error al intentar guardar los cambios.');
    }
  
  );
  }
  objectKeys(obj: RedesSociales){
    return Object.keys(obj)
}

  
}
