import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
})
export class AdminReportsComponent implements OnInit {
  totalStudent: number;
  totalsignups: number;
  totaltravel: number;

  un_totaluser: number;
  un_totalsignup: number;

  private months = [
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

  private weeks = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'];

  private st_entrends = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private st_not_entrends = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  private st_enweek = [0, 0, 0, 0, 0, 0, 0];
  private st_notenweek = [0, 0, 0, 0, 0, 0, 0];

  private un_trends = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private un_trendsweek = [0, 0, 0, 0, 0, 0, 0];

  constructor(private Aservice: AdminService) {}

  ngOnInit(): void {
    //Student charts start

    this.Aservice.st_totol().subscribe((data) => {
      this.totalStudent = data.data.t_std;

      new Chart('totlastudnet', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.data.en_std, data.data.not_enstd],
              backgroundColor: [
                'rgba(31, 47, 152, 1)',
                'rgba(170, 182, 251, 1)',
              ],
            },
          ],
          labels: ['Non-Enrolled Students', 'Enrolled Students'],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    });

    this.Aservice.st_signups().subscribe((data) => {
      this.totalsignups = data.data.t_signup;
      new Chart('totalsignups', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.data.en_signup, data.data.not_ensignup],
              backgroundColor: [
                'rgba(31, 47, 152, 1)',
                'rgba(170, 182, 251, 1)',
              ],
            },
          ],
          labels: ['Non-Enrolled Students', 'Enrolled Students'],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    });

    this.Aservice.st_intertrav().subscribe((data) => {
      this.totaltravel = data.data.trv_interstd;

      new Chart('internationaltraveller', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [data.data.trv_self, data.data.trv_notself],
              backgroundColor: [
                'rgba(31, 47, 152, 1)',
                'rgba(170, 182, 251, 1)',
              ],
            },
          ],
          labels: ['Non-Enrolled Students', 'Enrolled Students'],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    });

    this.Aservice.st_ensignyp().subscribe((data) => {
      data.st_en.forEach((items) => {
        this.st_entrends[items.month_id - 1] = items.total_count;
      });

      data.st_noten.forEach((items) => {
        this.st_not_entrends[items.month_id - 1] = items.total_count;
      });

      new Chart('trends', {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Enrolled Students',
              data: this.st_entrends,
              fill: false,
              backgroundColor: 'rgba(170, 182, 251, 1)',
              borderColor: 'rgba(170, 182, 251, 1)',
            },
            {
              label: 'Non Enrolled Students',
              data: this.st_not_entrends,
              fill: false,
              backgroundColor: 'rgb(31,47,152)',
              borderColor: 'rgb(31,47,152)',
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
    });

    this.Aservice.st_weeksignup().subscribe((data) => {
      data.st_en.forEach((item) => {
        this.st_enweek[item.week_id - 1] = item.total_count;
      });

      data.st_noten.forEach((item) => {
        this.st_notenweek[item.week_id - 1] = item.total_count;
      });

      new Chart('thisweekSign', {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Non Enrolled Students',
              data: this.st_notenweek,
              backgroundColor: 'rgba(31, 47, 152, 1)',
            },
            {
              label: 'Enrolled Students',
              data: this.st_enweek,
              backgroundColor: 'rgba(170, 182, 251, 1)',
            },
          ],
          labels: this.weeks,
        },
      });
    });

    new Chart('demographics', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Non Enrolled Students',
            data: [231, 45, 123, 54, 12, 43, 45],
            backgroundColor: 'rgba(31, 47, 152, 1)',
          },
          {
            label: 'Enrolled Students',
            data: [34, 73, 86, 45, 56, 34, 56],
            backgroundColor: 'rgba(170, 182, 251, 1)',
          },
        ],
        labels: this.weeks,
      },
    });

    //End Student Chart

    //Start University Chart

    this.Aservice.un_blocks().subscribe((data) => {
      this.un_totaluser = data.data.total_un;
      this.un_totalsignup = data.data.signups;
    });

    this.Aservice.un_trends().subscribe((data) => {
      data.data.forEach((item) => {
        this.un_trends[item.month_id - 1] = item.total;
      });

      new Chart('un_trent', {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Universities',
              data: this.un_trends,
              fill: false,
              backgroundColor: 'rgb(31,47,152)',
              borderColor: 'rgb(31,47,152)',
            },
          ],
        },
        options: {
          responsive: true,
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
    });

    this.Aservice.un_weektrend().subscribe((data) => {
      data.data.forEach((item) => {
        this.un_trendsweek[item.week_id - 1] = item.total;
      });

      new Chart('un_signupperweek', {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Universities',
              data: this.un_trendsweek,
              backgroundColor: 'rgba(31, 47, 152, 1)',
            },
          ],
          labels: this.weeks,
        },
      });
    });

    //End University Chart

    // Start App Analize

    new Chart('growth', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'New Users',
            data: this.st_entrends,
            backgroundColor: 'rgb(31,47,152)',
            borderColor: 'rgb(31,47,152)',
          },
          {
            label: 'Existing Users',
            data: this.st_not_entrends,
            backgroundColor: 'rgba(170, 182, 251, 1)',
            borderColor: 'rgba(170, 182, 251, 1)',
          },
          {
            label: 'who knows',
            data: this.st_not_entrends,
            backgroundColor: 'rgba(253, 200, 39, 1)',
            borderColor: 'rgba(253, 200, 39, 2)',
            type: 'line',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
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

    new Chart('app_signupperweek', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Non Enrolled Students',
            data: [231, 45, 123, 54, 12, 43, 45],
            backgroundColor: 'rgba(31, 47, 152, 1)',
          },
          {
            label: 'Enrolled Students',
            data: [34, 73, 86, 45, 56, 34, 56],
            backgroundColor: 'rgba(170, 182, 251, 1)',
          },
        ],
        labels: this.weeks,
      },
    });

    //End App Analize
  }
}
