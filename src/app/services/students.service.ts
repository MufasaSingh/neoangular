import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { formlist } from './interfaces/formlist.modal';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url: string = "http://103.43.153.37:4200/apis/students";

  constructor(private http: HttpClient) { }

  createStudent(data: any){
    return this.http.post<{error: number, error_msg: string}>(this.url + "/add_student", data) ;
  }

  formlist(){
    return this.http.post<{error: number, error_msg: string, data: any}>(this.url + "/getformall","");
  }

  formdetail(data: any){
    return this.http.post<{error: number, error_msg: string, data: formlist[]}>(`${this.url}/getform`, data)
  }

}
