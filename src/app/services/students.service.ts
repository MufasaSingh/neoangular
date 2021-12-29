import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { studentform } from './interfaces/studentform.modal';
import { normal_form } from './interfaces/normal_form.modal';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private url: string = `${environment.api_url}/students`;

  constructor(private http: HttpClient) {}

  createStudent(data: any) {
    return this.http.post<{ error: number; error_msg: string }>(
      this.url + '/add_student',
      data
    );
  }

  formlist() {
    return this.http.post<{ error: number; error_msg: string; data: any }>(
      this.url + '/formlist',
      ''
    );
  }

  formdetail(data: any) {
    return this.http.post<{
      error: number;
      error_msg: string;
      data: studentform; 
    }>(`${this.url}/getform`, data);
  }

  getnormal_form(id: number){
    return this.http.get<{ data: normal_form[] }>(`${this.url}/getnormalform/${id}`)
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.url}/${id}`).subscribe();
  }

  updateform(data: any){
    return this.http.post(`${this.url}/applyform`,data);
  }

}
