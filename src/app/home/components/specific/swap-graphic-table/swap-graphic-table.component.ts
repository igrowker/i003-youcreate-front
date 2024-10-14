import { Component } from '@angular/core';
import { SwapBarGraphicComponent } from "../swap-bar-graphic/swap-bar-graphic.component";
import { SwapTablaMesComponent } from "../swap-tabla-mes/swap-tabla-mes.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterIncomeDialogComponent } from '../../register-income-dialog/register-income-dialog.component';
import { IngresosService } from '../../../../services/ingresos.service';
import { Income } from '../../../../core/models/income.interface';

@Component({
  selector: 'app-swap-graphic-table',
  standalone: true,
  imports: [SwapBarGraphicComponent, SwapTablaMesComponent, ReactiveFormsModule,RegisterIncomeDialogComponent],
  templateUrl: './swap-graphic-table.component.html',
  styleUrl: './swap-graphic-table.component.css'
})
export class SwapGraphicTableComponent {

  filtro = 'month';
  filterForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingresosService: IngresosService
  ){
    this.filterForm = this.fb.group({
      selectedFilter:['month']
    });

    this.filterForm.get('selectedFilter')?.valueChanges.subscribe(value=>{
      this.onFilterChange(value);
    })
  }

  onFilterChange(selectedValue : string){
    this.filtro = selectedValue;
  }

  setNewIncomeRegistered(formValues:Income){
    this.ingresosService.postIngreso(formValues);
  }

}
