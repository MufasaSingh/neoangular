import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment"


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAuthencated: boolean = false;
  private url = `${environment.api_url}/admin` ;


  
  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post<{error: number, error_msg: string}>(`${this.url}/login`, data);
  }

  getIsAuth(){
    return this.isAuthencated;
  }

  setIsAuth(){
    this.isAuthencated = true;
  }

}
