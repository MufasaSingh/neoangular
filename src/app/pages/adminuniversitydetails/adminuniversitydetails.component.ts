import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-adminuniversitydetails',
  templateUrl: './adminuniversitydetails.component.html',
  styleUrls: ['./adminuniversitydetails.component.css'],
})
export class AdminuniversitydetailsComponent implements OnInit {
  private university_id: any;
  mainUn: UniversityList;

  subUn: UniversityList[] = [];

  constructor(
    private activeRouter: ActivatedRoute,
    private Uservice: UniversityService
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('u_id')) {  
        this.university_id = paramMap.get('u_id'); 
        
        this.Uservice.universitygetbyid(this.university_id).subscribe(
          (data) => {
            this.mainUn = data.un_data;
            this.subUn = data.pa_data
          }
        );
      }
    });
  }
}
