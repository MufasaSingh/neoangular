import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { UniversityList } from './interfaces/universitylist.modal';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private url: string = "http://103.43.153.37:4200/apis/university";


  constructor(private http: HttpClient) { }

  createUniversity(data: any){
    return this.http.post<{ error: number, error_msg: string }>(this.url + "/create", data);
  }

  universityList(){
    return this.http.post<{ error: number, error_msg: string, data: UniversityList[] }>(`${this.url}/list`,"");
  }

}
