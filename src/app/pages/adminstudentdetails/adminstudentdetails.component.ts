import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router"
import { formlist  } from "src/app/services/interfaces/formlist.modal"
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-adminstudentdetails',
  templateUrl: './adminstudentdetails.component.html',
  styleUrls: ['./adminstudentdetails.component.css']
})
export class AdminstudentdetailsComponent implements OnInit {
 
  form: formlist[]; 
  form_id  : any;

  constructor(private activeRouter: ActivatedRoute, private service: StudentsService) { }

  ngOnInit(): void {

    this.activeRouter.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has("formid")) {
        console.log(paramMap.get("formid"));
        
        this.form_id = paramMap.get("formid");

        const values = {
          "form_id": this.form_id
        }
        
        this.service.formdetail(values).subscribe(data=>{
          this.form = data.data; 
          console.log();
          
        })
      }
    })

  }

}
