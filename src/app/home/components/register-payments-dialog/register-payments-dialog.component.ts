import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'register-payments-dialog',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './register-payments-dialog.component.html',
  styleUrl: './register-payments-dialog.component.css'
})
export class RegisterPaymentsDialogComponent {
   isVisible = false;

  openDialog() {
    this.isVisible = true;
  }

  closeDialog() {
    this.isVisible = false;
  }
}
