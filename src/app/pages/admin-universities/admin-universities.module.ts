import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AdminUniversitiesRoutingModule } from './admin-universities-routing.module';
import { AdminUniversitiesComponent } from './admin-universities.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AdminUniversitiesComponent
  ],
  imports: [
    CommonModule,
    AdminUniversitiesRoutingModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSnackBarModule ,
    MatCheckboxModule
  ]
})
export class AdminUniversitiesModule { }
