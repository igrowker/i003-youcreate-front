import { Component, Input } from '@angular/core';
import { Income } from '../../../../core/models/income.interface';
import { DatePipe } from '@angular/common';
import { NumberWithDotsPipe } from '../../../../shared/pipes/number-with-dots.pipe';

@Component({
  selector: 'app-tabla-mes',
  standalone: true,
  imports: [DatePipe, NumberWithDotsPipe],
  templateUrl: './tabla-mes.component.html',
  styleUrl: './tabla-mes.component.css'
})
export class TablaMesComponent {

  @Input() incomes!:Income[];

  
}
