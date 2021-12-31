import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UniversityList } from './interfaces/universitylist.modal';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  private url: string = `${environment.api_url}/university`;

  constructor(private http: HttpClient) {}

  createUniversity(data: any) {
    return this.http.post<{ error: number; error_msg: string }>(
      `${this.url}/create`,
      data
    );
  }

  updateUnivesity(data: any){
    return this.http.post<{ error: number; error_msg: string }>(`${this.url}/update`, data)
  }

  universityList() {
    return this.http.post<{
      error: number;
      error_msg: string;
      data: UniversityList[];
    }>(`${this.url}/list`, '');
  }

  universitytodayList() {
    return this.http.post<{
      error: number;
      error_msg: string;
      data: UniversityList[];
    }>(`${this.url}/recentSignup`, '');
  }

  deleteUniversity(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe();
  }

  universitygetbyid(id: any) { 
    return this.http.get<{
      error: number;
      error_msg: string;
      un_data: UniversityList;
      pa_data: UniversityList[];
    }>(`${this.url}/${id}`);
  }
}
