import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';



@Component({
  selector: 'app-account-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './account-data.component.html',
  styleUrl: './account-data.component.css'
})
export class AccountDataComponent {
  accountData: any = {};
  isEditing: boolean = false;

  constructor(private accountService: AccountService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.accountService.getAccountData().subscribe((data) => {
      this.accountData = data;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveAccount() {
    this.accountService.updateAccountData(this.accountData).subscribe(response => {
      console.log('Datos actualizados:', response);
      this.isEditing = false; 
      this.cdr.detectChanges();
    },

    (err) => {
      console.error('Error al actualizar los datos:', err);
      alert('Hubo un error al intentar guardar los cambios.');
    }
  
  );
  }
  
}
