import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { UniversityService } from 'src/app/services/university.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  un_list: UniversityList[] = [];

  t_signup: number;
  t_student: number;
  t_un: number;

  constructor(
    private Uservice: UniversityService,
    private Aservice: AdminService
  ) {}

  ngAfterViewInit(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Current Vallue',
            data: [0, 20, 40, 50],
            backgroundColor: 'rgb(115 185 243 / 65%)',
            borderColor: '#007ee7',
            fill: true,
          },
          {
            label: 'Invested Amount',
            data: [0, 20, 40, 60, 80],
            backgroundColor: '#47a0e8',
            borderColor: '#007ee7',
            fill: true,
          },
        ],
        labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019'],
      },
    });
  }

  ngOnInit(): void {
    this.Uservice.universitytodayList().subscribe((data) => {
      this.un_list = data.data;
    });

    this.Aservice.dashboardSrores().subscribe((data) => {
      this.t_signup = data.data.t_signup;
      this.t_student = data.data.t_student;
      this.t_un = data.data.t_un;
    });
  }
}
