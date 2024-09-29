import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Collaboration } from '../../../core/models/collaborator-payments.interface';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input({ required: true }) dataList!: Collaboration[] | any[];

  @Input({required: true})  rowsPerPage!: number;

  @Input() currentPage:number = 1;

  @Output() pageChange = new EventEmitter<number>();
  
  @Output() currentPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.dataList.length / this.rowsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage)
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage)
    }
  }
}
