import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Country{
  name: string;
  code: string;
  areaCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countriesUrl = "../../assets/countries.json"
  
  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.countriesUrl)
  }
}
