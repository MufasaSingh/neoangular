import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminReportsComponent } from './admin-reports.component';


@NgModule({
  declarations: [
    AdminReportsComponent
  ],
  imports: [
    CommonModule,
    AdminReportsRoutingModule
  ]
})
export class AdminReportsModule { }
