import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './layouts/basic/basic.component'; 
import { BlankComponent } from './layouts/blank/blank.component';

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
          loadChildren: ()=> import("./pages/admindashboard/admindashboard.module").then(m=> m.AdmindashboardModule)
        },{
          path: "students",
          loadChildren: ()=> import("./pages/admin-students/admin-students.module").then(m=> m.AdminStudentsModule)
        },{
          path: "studentdetails",
          loadChildren: ()=> import("./pages/adminstudentdetails/adminstudentdetails.module").then(m=> m.AdminstudentdetailsModule)
        },{
          path: "universities",
          loadChildren: ()=> import("./pages/admin-universities/admin-universities.module").then(m=> m.AdminUniversitiesModule)
        },{
          path: "universitydetails",
          loadChildren: ()=> import("./pages/adminuniversitydetails/adminuniversitydetails.module").then(m=> m.AdminuniversitydetailsModule)
        } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
