import { Component } from '@angular/core';
import { SwapBarGraphicComponent } from "../swap-bar-graphic/swap-bar-graphic.component";
import { SwapTablaMesComponent } from "../swap-tabla-mes/swap-tabla-mes.component";

@Component({
  selector: 'app-swap-graphic-table',
  standalone: true,
  imports: [SwapBarGraphicComponent, SwapTablaMesComponent],
  templateUrl: './swap-graphic-table.component.html',
  styleUrl: './swap-graphic-table.component.css'
})
export class SwapGraphicTableComponent {

}
