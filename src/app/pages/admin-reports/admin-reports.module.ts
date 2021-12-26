import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminReportsComponent } from './admin-reports.component';
import { WorldChartComponent } from 'src/app/maps/world-chart/world-chart.component';
import { PieChartComponent } from 'src/app/maps/pie-chart/pie-chart.component';
import { HighchartsChartModule } from "highcharts-angular"


@NgModule({
  declarations: [
    AdminReportsComponent,
    WorldChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    AdminReportsRoutingModule,
    HighchartsChartModule,
  ]
})
export class AdminReportsModule { }
