import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentsComponent } from './admin-students.component';

const routes: Routes = [
  {
    path: "",
    component: AdminStudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentsRoutingModule { }
