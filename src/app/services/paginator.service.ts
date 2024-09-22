import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  paginatedData(currentPage: number, rowsPerPage: number, dataList: any[]) {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataList.slice(start, end);
  }
}
