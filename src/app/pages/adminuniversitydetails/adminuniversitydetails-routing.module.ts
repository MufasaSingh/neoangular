import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuniversitydetailsComponent } from './adminuniversitydetails.component';

const routes: Routes = [
  {
    path: "",
    component: AdminuniversitydetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminuniversitydetailsRoutingModule { }
