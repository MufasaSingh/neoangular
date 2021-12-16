import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UniversityService } from '../../services/university.service';
import { RegionsService } from '../../services/regions.service';
import { AdminService } from '../../services/admin.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { countries } from 'src/app/services/interfaces/country.modal';
import { states } from 'src/app/services/interfaces/states.modal';
import { plans } from 'src/app/services/interfaces/plan.modal';

@Component({
  selector: 'app-admin-universities',
  templateUrl: './admin-universities.component.html',
  styleUrls: ['./admin-universities.component.css'],
})

export class AdminUniversitiesComponent implements OnInit {
  closeResult = '';

  list: UniversityList[] = [];
  country: countries[] = [];
  states: states[] = [];

  plans : plans[] = [];

  form: FormGroup;
  roleform: FormGroup;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private modalService: NgbModal,
    private service: UniversityService,
    private _snackBar: MatSnackBar,
    private Rservice: RegionsService,
    private Aservice: AdminService
  ) {}

  ngOnInit(): void {

    this.Rservice.getCountry().subscribe(data=>{
      this.country = data.data
    })

    this.service.universityList().subscribe((data) => {
      this.list = data.data;
    });

    this.Aservice.listPlan().subscribe(data=> {
      this.plans = data.data
    })

    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      mobile: new FormControl(null),
      address: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      plans: new FormControl(null),
      director_email: new FormControl(null),
      manager_email: new FormControl(null),
      assistant_email: new FormControl(null),
      team_email: new FormControl(null),
    });

    this.roleform = new FormGroup({
      plan_name  : new FormControl(null),
      un_profile  : new FormControl(null),
      un_updates  : new FormControl(null),
      arrival_form  : new FormControl(null),
      chat    : new FormControl(null),
      contact_support  : new FormControl(null),
      send_alert  : new FormControl(null),
      un_pro_overview  : new FormControl(null),
      un_pro_course  : new FormControl(null),
      un_pro_contactun  : new FormControl(null),
      un_pro_faq  : new FormControl(null),
      un_pro_apply  : new FormControl(null),
      un_up_service  : new FormControl(null),
      un_up_health  : new FormControl(null),
      un_up_news  : new FormControl(null),
      un_up_life  : new FormControl(null),
      fm_terms  : new FormControl(null),
      fm_first_name  : new FormControl(null),
      fm_last_name  : new FormControl(null),
      fm_email  : new FormControl(null),
      fm_mobile  : new FormControl(null),
      fm_gender  : new FormControl(null),
      fm_dob  : new FormControl(null),
      fm_per_add  : new FormControl(null),
      fm_per_state  : new FormControl(null),
      fm_per_city  : new FormControl(null),
      fm_per_postcode  : new FormControl(null),
      fm_cur_add  : new FormControl(null),
      fm_cur_state  : new FormControl(null),
      fm_cur_city  : new FormControl(null),
      fm_cur_postcode  : new FormControl(null),
      fm_campus  : new FormControl(null),
      fm_progappliedto  : new FormControl(null),
      fm_intake  : new FormControl(null),
      fm_studentno  : new FormControl(null),
      fm_visa_issudate  : new FormControl(null),
      fm_traveltodiffcounty  : new FormControl(null),
      fm_travelbyself  : new FormControl(null),
      fm_acc_byfamily  : new FormControl(null),
      fm_familyno  : new FormControl(null),
      fm_specialaccomo  : new FormControl(null),
      fm_modeoftransport  : new FormControl(null),
      fm_airline  : new FormControl(null),
      fm_dptcountry  : new FormControl(null),
      fm_dptcity  : new FormControl(null),
      fm_dptdate  : new FormControl(null),
      fm_dpttime  : new FormControl(null),
      fm_connectflight  : new FormControl(null),
      fm_connectflightno  : new FormControl(null),
      fm_arri_country  : new FormControl(null),
      fm_arri_city  : new FormControl(null),
      fm_hotal_name  : new FormControl(null),
      fm_hotal_roomno  : new FormControl(null),
      fm_hotal_address  : new FormControl(null),
      fm_hotal_countycode  : new FormControl(null),
      fm_hotal_no  : new FormControl(null),
      fm_city_of_un  : new FormControl(null),
      fm_finaltransportmode  : new FormControl(null),
      fm_transportno  : new FormControl(null),
      fm_arri_date  : new FormControl(null),
      fm_arri_time  : new FormControl(null),
      fm_addtionalinfo  : new FormControl(null)
    })

  }

  openSnackBar(error_msg: string) {
    this._snackBar.open(error_msg, 'Dismiss', {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addUniversity() {
    if (this.form.invalid) return;

    this.modalService.dismissAll('saved');
    const data = this.form.value;

    const values = {
      name: data.name,
      email: data.email,
    };

    this.service.createUniversity(values).subscribe((dta) => {
      this.openSnackBar(dta.error_msg);
    });

  
  }

  addRole(){

    if(this.roleform.invalid) return;  

    const plan = {

      plan_name  : this.roleform.value.plan_name,
      un_profile  : this.roleform.value.un_profile,
      un_updates  : this.roleform.value.un_updates,
      arrival_form  : this.roleform.value.arrival_form,
      chat    : this.roleform.value.chat,
      contact_support  : this.roleform.value.contact_support,
      send_alert  : this.roleform.value.send_alert,
      un_pro_overview  : this.roleform.value.un_pro_overview,
      un_pro_course  : this.roleform.value.un_pro_course,
      un_pro_contactun  : this.roleform.value.un_pro_contactun,
      un_pro_faq  : this.roleform.value.un_pro_faq,
      un_pro_apply  : this.roleform.value.un_pro_apply,
      un_up_service  : this.roleform.value.un_up_service,
      un_up_health  : this.roleform.value.un_up_health,
      un_up_news  : this.roleform.value.un_up_news,
      un_up_life  : this.roleform.value.un_up_life,
      fm_terms  : this.roleform.value.fm_terms,
      fm_first_name  : this.roleform.value.fm_first_name,
      fm_last_name  : this.roleform.value.fm_last_name,
      fm_email  : this.roleform.value.fm_email,
      fm_mobile  : this.roleform.value.fm_mobile,
      fm_gender  : this.roleform.value.fm_gender,
      fm_dob  : this.roleform.value.fm_dob,
      fm_per_add  : this.roleform.value.fm_per_add,
      fm_per_state  : this.roleform.value.fm_per_state,
      fm_per_city  : this.roleform.value.fm_per_city,
      fm_per_postcode  : this.roleform.value.fm_per_postcode,
      fm_cur_add  : this.roleform.value.fm_cur_add,
      fm_cur_state  : this.roleform.value.fm_cur_state,
      fm_cur_city  : this.roleform.value.fm_cur_city,
      fm_cur_postcode  : this.roleform.value.fm_cur_postcode,
      fm_campus  : this.roleform.value.fm_campus,
      fm_progappliedto  : this.roleform.value.fm_progappliedto,
      fm_intake  : this.roleform.value.fm_intake,
      fm_studentno  : this.roleform.value.fm_studentno,
      fm_visa_issudate  : this.roleform.value.fm_visa_issudate,
      fm_traveltodiffcounty  : this.roleform.value.fm_traveltodiffcounty,
      fm_travelbyself  : this.roleform.value.fm_travelbyself,
      fm_acc_byfamily  : this.roleform.value.fm_acc_byfamily,
      fm_familyno  : this.roleform.value.fm_familyno,
      fm_specialaccomo  : this.roleform.value.fm_specialaccomo,
      fm_modeoftransport  : this.roleform.value.fm_modeoftransport,
      fm_airline  : this.roleform.value.fm_airline,
      fm_dptcountry  : this.roleform.value.fm_dptcountry,
      fm_dptcity  : this.roleform.value.fm_dptcity,
      fm_dptdate  : this.roleform.value.fm_dptdate,
      fm_dpttime  : this.roleform.value.fm_dpttime,
      fm_connectflight  : this.roleform.value.fm_connectflight,
      fm_connectflightno  : this.roleform.value.fm_connectflightno,
      fm_arri_country  : this.roleform.value.fm_arri_country,
      fm_arri_city  : this.roleform.value.fm_arri_city,
      fm_hotal_name  : this.roleform.value.fm_hotal_name,
      fm_hotal_roomno  : this.roleform.value.fm_hotal_roomno,
      fm_hotal_address  : this.roleform.value.fm_hotal_address,
      fm_hotal_countycode  : this.roleform.value.fm_hotal_countycode,
      fm_hotal_no  : this.roleform.value.fm_hotal_no,
      fm_city_of_un  : this.roleform.value.fm_city_of_un,
      fm_finaltransportmode  : this.roleform.value.fm_finaltransportmode,
      fm_transportno  : this.roleform.value.fm_transportno,
      fm_arri_date  : this.roleform.value.fm_arri_date,
      fm_arri_time  : this.roleform.value.fm_arri_time,
      fm_addtionalinfo  : this.roleform.value.fm_addtionalinfo

    }
 

    this.Aservice.addPlan(plan).subscribe(data=>{
      this.modalService.dismissAll('saved');
        this.openSnackBar(data.error_msg)
        this.roleform.reset();
    })

  }

  onchnage(id: any){

    const values = {
      "country_id": id
    }    

    this.Rservice.getState(values).subscribe(data=>{
      this.states = data.data
    })

  }

}
