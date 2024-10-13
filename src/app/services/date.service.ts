import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  fechaActual = new Date();

  constructor() { }
  
  getMesActual(){
    return this.fechaActual.getMonth()+1;
  }

  getAnioActual(){
    return this.fechaActual.getFullYear();
  }

  getDiaActual(){
    return this.fechaActual.getDate();
  }

}
