import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from "@angular/router"


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {


  form: FormGroup;

  constructor(private service: AdminService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      "email": new FormControl(null, ),
      "password": new FormControl(null)
    })

  }

  login(){

    if (this.form.invalid) return

    const values = {
      "email": this.form.value.email,
      "pass": this.form.value.password
    }

    this.service.login(values).subscribe(data=>{        

      if (data.error == 1) {  
        this.service.setIsAuth();
        this.router.navigate(["/admin/dashboard"])

      }else{

      }
    })
  }

}
