import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUniversitiesComponent } from './admin-universities.component';


const routes: Routes = [
  {
    path: "",
    component: AdminUniversitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUniversitiesRoutingModule { }
