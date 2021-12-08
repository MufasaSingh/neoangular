import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentsRoutingModule } from './admin-students-routing.module';
import { AdminStudentsComponent } from "./admin-students.component"


@NgModule({
  declarations: [
    AdminStudentsComponent
  ],
  imports: [
    CommonModule,
    AdminStudentsRoutingModule
  ]
})
export class AdminStudentsModule { }
