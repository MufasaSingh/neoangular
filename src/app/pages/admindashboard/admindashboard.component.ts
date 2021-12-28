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

  plans: string[] = [];


  private t_enstd: number;
  private t_notenstd: number;

  private newUser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private existingUser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  myChart: any;

  

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
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

   blueshades = ['rgb(0, 255, 255)','rgb(240, 255, 255)','rgb(137, 207, 240)','rgb(0, 0, 255)','rgb(115, 147, 179)','rgb(8, 143, 143)','rgb(0, 150, 255)','rgb(95, 158, 160)','rgb(0, 71, 171)','rgb(100, 149, 237)','rgb(0, 255, 255)','rgb(0, 0, 139)','rgb(111, 143, 175)','rgb(20, 52, 164)','rgb(125, 249, 255)','rgb(96, 130, 182)','rgb(0, 163, 108)','rgb(63, 0, 255)','rgb(93, 63, 211)','rgb(173, 216, 230)','rgb(25, 25, 112)','rgb(0, 0, 128)','rgb(31, 81, 255)','rgb(167, 199, 231)','rgb(204, 204, 255)','rgb(182, 208, 226)','rgb(150, 222, 209)','rgb(65, 105, 225)','rgb(15, 82, 186)','rgb(159, 226, 191)','rgb(135, 206, 235)','rgb(70, 130, 180)','rgb(0, 128, 128)','rgb(64, 224, 208)','rgb(4, 55, 242)','rgb(64, 181, 173)','rgb(8, 24, 168)']

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

    this.Aservice.dashboardreport().subscribe(data=> {
      this.t_enstd = data.en_std.entotal
      this.t_notenstd = data.not_enstd.entotal

      this.plans = data.plan_data.map(item=>{
        return item.plan_name
      })

      const plan_data = data.plan_data.map(items=> {
        return items.plan_total
      })

      data.newuser.forEach(items=>{
        this.newUser[items.month_id - 1] = items.total_count
      })

      data.existingUser.forEach(items=>{
        this.existingUser[items.month_id - 1] = items.total_count
      })

      new Chart('mychart', {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'New Users',
              data: this.newUser,
              fill: false,
              backgroundColor: 'rgb(31,47,152)',
              borderColor: 'rgb(31,47,152)',
            },
            {
              label: 'Existing Users',
              data: this.existingUser,
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
            data: [this.t_enstd,this.t_notenstd],
            backgroundColor: [
              'rgba(170, 182, 251, 0.6)',
              'rgba(170, 182, 251, 1)'
            ] 
          }],
          labels: ['General Students', 'Enrolled Sudents']
        },
        options: {
          legend: {
            display: false,
          },
        },
      })
      //dynamic colors
      new Chart("pie", {
        type: 'pie',
        data: { 
          datasets: [{ 
            data: plan_data,
            backgroundColor: this.blueshades
          }],
          labels: this.plans
        },
        options: {
          legend: {
            display: false,
          },
        },
    });

    })


  }
}
