import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { plans } from './interfaces/plan.modal';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = `${environment.api_url}/admin`;
  private token: string;
  private authServiceListern = new Subject<boolean>();
  private isAuthencated: boolean = false;
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    this.http
      .post<{
        error: number;
        error_msg: string;
        expireIn: number;
        token: string;
        admin_id: string;
      }>(`${this.url}/login`, data)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expireIn;
          this.setAuthTimer(expiresInDuration);
          this.authServiceListern.next(true);
          this.userId = response.admin_id;
          this.isAuthencated = true;
          const now = new Date();
          const expire = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expire, this.userId);
          this.router.navigate(['/admin/dashboard']);
        }
      });
  }

  getIsAuth() {
    return this.isAuthencated;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = '';
    this.isAuthencated = false;
    clearTimeout(this.tokenTimer);
    this.userId = '';
    this.authServiceListern.next(false);
    this.router.navigate(['/admin/']);
    this.deleteAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private deleteAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  addPlan(data: any){
    return this.http.post<{error: string, error_msg: string, plan_id: string}>(`${this.url}/plan/create`, data) 
  }

  listPlan(){
    return this.http.get<{error: string, error_msg: string, data: plans[] }>(`${this.url}/plan/list`)
  }


}
