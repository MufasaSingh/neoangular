import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http" 
import { countries } from './interfaces/country.modal';
import { cities } from './interfaces/city.modal';
import { states } from './interfaces/states.modal';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private url = "http://103.43.153.37:4200/apis/regions/"

  constructor(private http: HttpClient) { }

  getCountry(){
   return this.http.post<{error: number, error_msg: string, data: countries[]}>(`${this.url}/getcountry`, "") 
  }

  getCity(data: any){
    return this.http.post<{error: number, error_msg: string, data: cities[]}>(`${this.url}/getcity`, data) 
  }

  getState(data: any){
    return this.http.post<{error: number, error_msg: string, data: states[]}>(`${this.url}/getstate`, data) 
  }
}
