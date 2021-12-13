import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAuthencated: boolean = false;

  private url = "http://103.43.153.37:4200/apis/admin"

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
