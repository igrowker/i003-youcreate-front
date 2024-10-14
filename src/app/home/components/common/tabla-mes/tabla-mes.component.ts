import { Component, Input } from '@angular/core';
import { Income } from '../../../../core/models/income.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NumberWithDotsPipe } from '../../../../shared/pipes/number-with-dots.pipe';

@Component({
  selector: 'app-tabla-mes',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './tabla-mes.component.html',
  styleUrl: './tabla-mes.component.css'
})
export class TablaMesComponent {

  @Input() incomes!:Income[];

  
}
