import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http" 
import { countries } from './interfaces/country.modal';
import { cities } from './interfaces/city.modal';
import { states } from './interfaces/states.modal';

import { environment } from "src/environments/environment"


@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private url = `${environment.api_url}/regions/`

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
