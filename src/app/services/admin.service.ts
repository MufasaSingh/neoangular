import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { plans } from './interfaces/plan.modal';
import { roles } from './interfaces/roles.modal';
import { dashscore } from './interfaces/dashscore.modal';

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
    const userId = <string>localStorage.getItem('userId');

    

    if (!token || !expirationDate) {
      return;
    }
    
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
 
    
    if (!authInformation) {
        return;
    }
    const now = new Date();
    const expireIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(expireIn);
    
    if (expireIn>0) {
        this.setAuthTimer(expireIn/1000);
        this.token = authInformation.token;
        this.isAuthencated = true;
        this.userId = authInformation.userId;
        this.authServiceListern.next(true);
    }
    

}

  addPlan(data: any) {
    return this.http.post<{
      error: string;
      error_msg: string;
      plan_id: string;
    }>(`${this.url}/plan/create`, data);
  }

  updatePlan(id: number, data: any) {
    return this.http.put<{ error: string; error_msg: string }>(
      `${this.url}/plan/${id}`,
      data
    );
  }

  listPlan() {
    return this.http.get<{ error: string; error_msg: string; data: plans[] }>(
      `${this.url}/plan/list`
    );
  }

  listRole() {
    return this.http.get<{ error: string; error_msg: string; data: roles[] }>(
      `${this.url}/role/list`
    );
  }

  addRole(data: any) {
    return this.http.post<{
      error: string;
      error_msg: string;
      role_id: string;
    }>(`${this.url}/role/create`, data);
  }

  updateRole(id: number, data: any) {
    return this.http.put<{ error: string; error_msg: string }>(
      `${this.url}/role/${id}`,
      data
    );
  }

  PlanbyId(id: number) {
    return this.http.get<{ error: string; error_msg: string; data: plans }>(
      `${this.url}/plan/${id}`
    );
  }

  RolebyId(id: number) {
    return this.http.get<{ error: string; error_msg: string; data: roles }>(
      `${this.url}/role/${id}`
    );
  }

  deletePlan(id: number) {
    this.http.delete(`${this.url}/plan/${id}`).subscribe();
  }

  deleteRole(id: number) {
    this.http.delete(`${this.url}/role/${id}`).subscribe();
  }

  dashboardSrores() {
    return this.http.get<{ error: string; error_msg: string; data: dashscore }>(
      `${this.url}/dashboardval`
    );
  }

  st_totol() {
    return this.http.get<{
      data: {
        en_std: number;
        not_enstd: number;
        t_std: number;
      };
    }>(`${this.url}/st_totalstudents`);
  }

  st_signups() {
    return this.http.get<{
      data: {
        t_signup: number;
        en_signup: number;
        not_ensignup: number;
      };
    }>(`${this.url}/st_totalsignups`);
  }

  st_intertrav() {
    return this.http.get<{
      data: {
        trv_interstd: number;
        trv_self: number;
        trv_notself: number;
      };
    }>(`${this.url}/st_intertrav`);
  }

  st_ensignyp() {
    return this.http.get<{
      st_en: {
        month_id: number;
        total_count: number;
      }[];
      st_noten: {
        month_id: number;
        total_count: number;
      }[];
    }>(`${this.url}/st_ensignyp`);
  }

  st_weeksignup() {
    return this.http.get<{
      st_en: {
        week_id: number;
        total_count: number;
      }[];
      st_noten: {
        week_id: number;
        total_count: number;
      }[];
    }>(`${this.url}/st_weeksignup`);
  }

  un_blocks() {
    return this.http.get<{
      data: {
        total_un: number;
        signups: number;
      };
    }>(`${this.url}/un_bar`);
  }

  un_trends() {
    return this.http.get<{
      data: {
        month_id: number;
        total: number;
      }[];
    }>(`${this.url}/un_signuptrendyear`);
  }

  un_weektrend() {
    return this.http.get<{
      data: {
        week_id: number;
        total: number;
      }[];
    }>(`${this.url}/un_signuptrendweek`);
  }

  getDemographics() {
    return this.http.get<{
      data: {
        en_std: number;
        not_enstd: number;
        Age: number;
      }[];
    }>(`${this.url}/getdemographics`);
  }

  dashboardreport() {
    return this.http.get<{
      bar: {
        t_users: number;
        t_signunv: number;
        t_signstd: number;
      };
      en_std: {
        entotal: number;
      };
      not_enstd: {
        entotal: number;
      };
      plan_data: {
        plan_name: string;
        plan_total: number;
      }[];
      newuser: {
        total_count: number;
        month_id: number;
      }[];
      existingUser: {
        total_count: number;
        month_id: number;
      }[];
    }>(`${this.url}/dashboard_report`);
  }

  getWorldreport() {
    return this.http.get<{
      university: { iso2: string; total_count: number }[];
      student: { iso2: string; total_count: number }[];
    }>(`${this.url}/worldreport`);
  }
}
