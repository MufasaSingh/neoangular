import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './layouts/basic/basic.component'; 
import { BlankComponent } from './layouts/blank/blank.component';

import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: "admin",
    component: BlankComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        loadChildren: ()=> import("./pages/adminlogin/adminlogin.module").then(m=> m.AdminloginModule)
      }
    ]
  },
  {
    path: "admin",
    component: BasicComponent,
    children: [ 
        {
          path: "dashboard",
          loadChildren: ()=> import("./pages/admindashboard/admindashboard.module").then(m=> m.AdmindashboardModule), canActivate: [AuthGuard]
        },{
          path: "students",
          loadChildren: ()=> import("./pages/admin-students/admin-students.module").then(m=> m.AdminStudentsModule),
          canActivate: [AuthGuard]
        },{
          path: "studentdetails/:formid",
          loadChildren: ()=> import("./pages/adminstudentdetails/adminstudentdetails.module").then(m=> m.AdminstudentdetailsModule),
          canActivate: [AuthGuard]
        },{
          path: "universities",
          loadChildren: ()=> import("./pages/admin-universities/admin-universities.module").then(m=> m.AdminUniversitiesModule),
          canActivate: [AuthGuard]
        },{
          path: "universitydetails/:u_id",
          loadChildren: ()=> import("./pages/adminuniversitydetails/adminuniversitydetails.module").then(m=> m.AdminuniversitydetailsModule),
          canActivate: [AuthGuard]
        },{
          path: "reports",
          loadChildren: ()=> import("./pages/admin-reports/admin-reports.module").then(m=> m.AdminReportsModule),
          canActivate: [AuthGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
