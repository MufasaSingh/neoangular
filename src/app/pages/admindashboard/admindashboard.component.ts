import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { UniversityService } from 'src/app/services/university.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  un_list: UniversityList[] = [];

  t_signup: number;
  t_student: number;
  t_un: number;

  myChart: any;

  months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  values = [12, 23, 34, 465, 456, 456, 34, 24, 234, 67, 90, 12];
  values2 = [23,23,123,457,89,24,367,234,123,456,345,121];

  constructor(
    private Uservice: UniversityService,
    private Aservice: AdminService
  ) {}

  ngOnInit(): void {
    this.Uservice.universitytodayList().subscribe((data) => {
      this.un_list = data.data;
    });

    this.Aservice.dashboardSrores().subscribe((data) => {
      this.t_signup = data.data.t_signup;
      this.t_student = data.data.t_student;
      this.t_un = data.data.t_un;
    });

    new Chart('mychart', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'New Users',
            data: this.values,
            fill: false,
            backgroundColor: 'rgb(31,47,152)',
            borderColor: 'rgb(31,47,152)',
          },
          {
            label: 'Existing Users',
            data: this.values2,
            fill: false,
            backgroundColor: 'rgba(170, 182, 251, 1)',
            borderColor: 'rgba(170, 182, 251, 1)',
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      
    });

    new Chart("donet",{
      type: "doughnut",
      data: { 
        datasets: [{ 
          data: [100,100],
          backgroundColor: [
            'rgba(170, 182, 251, 0.6)',
            'rgba(170, 182, 251, 1)'
          ] 
        }]
      }
    })


    new Chart("pie", {
      type: 'doughnut',
      data: { 
        datasets: [{ 
          data: [100,100],
          backgroundColor: [
            'rgba(170, 182, 251, 0.6)',
            'rgba(170, 182, 251, 1)'
          ] 
        }],
        labels: [
          'Red',
          'Yellow'
          
      ]
      }
  });

  }
}
