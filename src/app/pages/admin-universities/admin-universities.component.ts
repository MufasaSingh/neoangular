import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

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
import { roles } from 'src/app/services/interfaces/roles.modal';

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
  roles: roles[] = [];
  plans: plans[] = [];

  search: string;

  role_id:number;
  plan_id:number;

  form: FormGroup;
  roleform: FormGroup; //this is plan
  rolesform: FormGroup;

  private planmode: string = "create"; 
  private rolemode: string = "create"; 

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private modalService: NgbModal,
    private service: UniversityService,
    private _snackBar: MatSnackBar,
    private Rservice: RegionsService,
    private Aservice: AdminService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this._fb.group({
      name: [""],
      email: [""],
      mobile: [""],
      address: [""],
      country: [""],
      city: [""],
      plans: [""],
      universityRoles:  this._fb.array([])
    });

    this.Rservice.getCountry().subscribe((data) => {
      this.country = data.data;
    });

    this.service.universityList().subscribe((data) => {
      this.list = data.data;
    });

    this.Aservice.listPlan().subscribe((data) => {
      this.plans = data.data;
    });

    this.Aservice.listRole().subscribe((data) => {
      this.roles = data.data; 
      const control = <FormArray>this.form.controls['universityRoles'];

      for (let index = 0; index < this.roles.length; index++) {
        const roles = <FormGroup>this._fb.group({ 
          role_active: [''],
          role_id: [`${this.roles[index]['role_id']}`],
          role_email: ['']
        }); 
        control.push(roles);
      }

      

    });

    this.rolesform = new FormGroup({
      name: new FormControl(null, { validators: Validators.required }),
      student_add: new FormControl(false),
      student_edit: new FormControl(false),
      student_delete: new FormControl(false)
    }); 

   

    this.roleform = new FormGroup({
      plan_name: new FormControl(null),
      un_profile: new FormControl(false),
      un_updates: new FormControl(false),
      arrival_form: new FormControl(false),
      chat: new FormControl(false),
      contact_support: new FormControl(false),
      send_alert: new FormControl(false),
      un_pro_overview: new FormControl(false),
      un_pro_course: new FormControl(false),
      un_pro_contactun: new FormControl(false),
      un_pro_faq: new FormControl(false),
      un_pro_apply: new FormControl(false),
      un_up_service: new FormControl(false),
      un_up_health: new FormControl(false),
      un_up_news: new FormControl(false),
      un_up_life: new FormControl(false),
      fm_terms: new FormControl(false),
      fm_first_name: new FormControl(false),
      fm_last_name: new FormControl(false),
      fm_email: new FormControl(false),
      fm_mobile: new FormControl(false),
      fm_gender: new FormControl(false),
      fm_dob: new FormControl(false),
      fm_per_add: new FormControl(false),
      fm_per_state: new FormControl(false),
      fm_per_city: new FormControl(false),
      fm_per_postcode: new FormControl(false),
      fm_cur_add: new FormControl(false),
      fm_cur_state: new FormControl(false),
      fm_cur_city: new FormControl(false),
      fm_cur_postcode: new FormControl(false),
      fm_campus: new FormControl(false),
      fm_progappliedto: new FormControl(false),
      fm_intake: new FormControl(false),
      fm_studentno: new FormControl(false),
      fm_visa_issudate: new FormControl(false),
      fm_traveltodiffcounty: new FormControl(false),
      fm_travelbyself: new FormControl(false),
      fm_acc_byfamily: new FormControl(false),
      fm_familyno: new FormControl(false),
      fm_specialaccomo: new FormControl(false),
      fm_modeoftransport: new FormControl(false),
      fm_airline: new FormControl(false),
      fm_dptcountry: new FormControl(false),
      fm_dptcity: new FormControl(false),
      fm_dptdate: new FormControl(false),
      fm_dpttime: new FormControl(false),
      fm_connectflight: new FormControl(false),
      fm_connectflightno: new FormControl(false),
      fm_arri_country: new FormControl(false),
      fm_arri_city: new FormControl(false),
      fm_hotal_name: new FormControl(false),
      fm_hotal_roomno: new FormControl(false),
      fm_hotal_address: new FormControl(false),
      fm_hotal_countycode: new FormControl(false),
      fm_hotal_no: new FormControl(false),
      fm_city_of_un: new FormControl(false),
      fm_finaltransportmode: new FormControl(false),
      fm_transportno: new FormControl(false),
      fm_arri_date: new FormControl(false),
      fm_arri_time: new FormControl(false),
      fm_addtionalinfo: new FormControl(false),
    });
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

  getRoles(): FormArray{
    
    return this.form.get("universityRoles") as FormArray
    
  }
  

  addUniversity() {
    if (this.form.invalid) return;
 
    this.modalService.dismissAll('saved');
    const data = this.form.value;
 
    const stt  = <{role_active: boolean, role_id: number, role_email: string}[]>data.universityRoles

    let rolarr =  stt.filter((items: any)=>{
      if (items.role_active === true) return items
    })

    const values = {
      "name": data.name,
      "email": data.email,
      "mobile": data.mobile,
      "address": data.mobile,
      "country_id": data.country,
      "state_id": data.city,
      "plan_id": data.plans,
      "roles": rolarr
    }; 
    
    this.service.createUniversity(values).subscribe((dta) => {
      this.openSnackBar(dta.error_msg);
    });
  }

  createPlan(content: any){
    this.planmode = "create";
    this.open(content)
  }

  createRole(content: any){
    this.rolemode = "create";
    this.open(content)
  }

  addPlan() {
    if (this.roleform.invalid) return; 

    const plan = {
      plan_name: this.roleform.value.plan_name,
      un_profile: this.roleform.value.un_profile,
      un_updates: this.roleform.value.un_updates,
      arrival_form: this.roleform.value.arrival_form,
      chat: this.roleform.value.chat,
      contact_support: this.roleform.value.contact_support,
      send_alert: this.roleform.value.send_alert,
      un_pro_overview: this.roleform.value.un_pro_overview,
      un_pro_course: this.roleform.value.un_pro_course,
      un_pro_contactun: this.roleform.value.un_pro_contactun,
      un_pro_faq: this.roleform.value.un_pro_faq,
      un_pro_apply: this.roleform.value.un_pro_apply,
      un_up_service: this.roleform.value.un_up_service,
      un_up_health: this.roleform.value.un_up_health,
      un_up_news: this.roleform.value.un_up_news,
      un_up_life: this.roleform.value.un_up_life,
      fm_terms: this.roleform.value.fm_terms,
      fm_first_name: this.roleform.value.fm_first_name,
      fm_last_name: this.roleform.value.fm_last_name,
      fm_email: this.roleform.value.fm_email,
      fm_mobile: this.roleform.value.fm_mobile,
      fm_gender: this.roleform.value.fm_gender,
      fm_dob: this.roleform.value.fm_dob,
      fm_per_add: this.roleform.value.fm_per_add,
      fm_per_state: this.roleform.value.fm_per_state,
      fm_per_city: this.roleform.value.fm_per_city,
      fm_per_postcode: this.roleform.value.fm_per_postcode,
      fm_cur_add: this.roleform.value.fm_cur_add,
      fm_cur_state: this.roleform.value.fm_cur_state,
      fm_cur_city: this.roleform.value.fm_cur_city,
      fm_cur_postcode: this.roleform.value.fm_cur_postcode,
      fm_campus: this.roleform.value.fm_campus,
      fm_progappliedto: this.roleform.value.fm_progappliedto,
      fm_intake: this.roleform.value.fm_intake,
      fm_studentno: this.roleform.value.fm_studentno,
      fm_visa_issudate: this.roleform.value.fm_visa_issudate,
      fm_traveltodiffcounty: this.roleform.value.fm_traveltodiffcounty,
      fm_travelbyself: this.roleform.value.fm_travelbyself,
      fm_acc_byfamily: this.roleform.value.fm_acc_byfamily,
      fm_familyno: this.roleform.value.fm_familyno,
      fm_specialaccomo: this.roleform.value.fm_specialaccomo,
      fm_modeoftransport: this.roleform.value.fm_modeoftransport,
      fm_airline: this.roleform.value.fm_airline,
      fm_dptcountry: this.roleform.value.fm_dptcountry,
      fm_dptcity: this.roleform.value.fm_dptcity,
      fm_dptdate: this.roleform.value.fm_dptdate,
      fm_dpttime: this.roleform.value.fm_dpttime,
      fm_connectflight: this.roleform.value.fm_connectflight,
      fm_connectflightno: this.roleform.value.fm_connectflightno,
      fm_arri_country: this.roleform.value.fm_arri_country,
      fm_arri_city: this.roleform.value.fm_arri_city,
      fm_hotal_name: this.roleform.value.fm_hotal_name,
      fm_hotal_roomno: this.roleform.value.fm_hotal_roomno,
      fm_hotal_address: this.roleform.value.fm_hotal_address,
      fm_hotal_countycode: this.roleform.value.fm_hotal_countycode,
      fm_hotal_no: this.roleform.value.fm_hotal_no,
      fm_city_of_un: this.roleform.value.fm_city_of_un,
      fm_finaltransportmode: this.roleform.value.fm_finaltransportmode,
      fm_transportno: this.roleform.value.fm_transportno,
      fm_arri_date: this.roleform.value.fm_arri_date,
      fm_arri_time: this.roleform.value.fm_arri_time,
      fm_addtionalinfo: this.roleform.value.fm_addtionalinfo,
    };

    
    
    if(this.planmode == "update"){ 
      this.Aservice.updatePlan(this.plan_id, this.roleform.value).subscribe(data=>{
        this.modalService.dismissAll('saved');
        this.openSnackBar(data.error_msg);
        this.roleform.reset();
      })
    }else{
      this.Aservice.addPlan(plan).subscribe((data) => {
        this.modalService.dismissAll('saved');
        this.openSnackBar(data.error_msg);
        this.roleform.reset();
      });
    }

  
  }

  addRole() {
    if (this.rolesform.invalid) return;

    const role = {
      name: this.rolesform.value.name,
      student_add: this.rolesform.value.student_add,
      student_delete: this.rolesform.value.student_delete,
      student_edit: this.rolesform.value.student_edit,
    };
 
    if(this.rolemode == "create"){
      this.Aservice.addRole(role).subscribe((data) => {
        this.modalService.dismissAll('ok');
        this.openSnackBar(data.error_msg);
      });
    }else{ 
      

      this.Aservice.updateRole(this.role_id, role).subscribe(data=> {
        this.modalService.dismissAll("ok");
        this.openSnackBar(data.error_msg)
      })
    }
    

    

  }

  onchnage(id: any) {
    const values = {
      country_id: id,
    };

    this.Rservice.getState(values).subscribe((data) => {
      this.states = data.data;
    });
  }

  editPlan(id: number, content: any) {
    this.plan_id = id;
    this.planmode = "update";
    this.Aservice.PlanbyId(id).subscribe((data) => { 
  
      this.roleform.setValue({
        plan_name: data.data.plan_name,
        un_profile: this.checkboolen(data.data.un_profile),
        un_updates: this.checkboolen(data.data.un_updates),
        arrival_form: this.checkboolen(data.data.arrival_form),
        chat: this.checkboolen(data.data.chat),
        contact_support: this.checkboolen(data.data.contact_support),
        send_alert: this.checkboolen(data.data.send_alert),
        un_pro_overview: this.checkboolen(data.data.un_pro_overview),
        un_pro_course: this.checkboolen(data.data.un_pro_course),
        un_pro_contactun: this.checkboolen(data.data.un_pro_contactun),
        un_pro_faq: this.checkboolen(data.data.un_pro_faq),
        un_pro_apply: this.checkboolen(data.data.un_pro_apply),
        un_up_service: this.checkboolen(data.data.un_up_service),
        un_up_health: this.checkboolen(data.data.un_up_health),
        un_up_news: this.checkboolen(data.data.un_up_news),
        un_up_life: this.checkboolen(data.data.un_up_life),
        fm_terms: this.checkboolen(data.data.fm_terms),
        fm_first_name: this.checkboolen(data.data.fm_first_name),
        fm_last_name: this.checkboolen(data.data.fm_last_name),
        fm_email: this.checkboolen(data.data.fm_email),
        fm_mobile: this.checkboolen(data.data.fm_mobile),
        fm_gender: this.checkboolen(data.data.fm_gender),
        fm_dob: this.checkboolen(data.data.fm_dob),
        fm_per_add: this.checkboolen(data.data.fm_per_add),
        fm_per_state: this.checkboolen(data.data.fm_per_state),
        fm_per_city: this.checkboolen(data.data.fm_per_city),
        fm_per_postcode: this.checkboolen(data.data.fm_per_postcode),
        fm_cur_add: this.checkboolen(data.data.fm_cur_add),
        fm_cur_state: this.checkboolen(data.data.fm_cur_state),
        fm_cur_city: this.checkboolen(data.data.fm_cur_city),
        fm_cur_postcode: this.checkboolen(data.data.fm_cur_postcode),
        fm_campus: this.checkboolen(data.data.fm_campus),
        fm_progappliedto: this.checkboolen(data.data.fm_progappliedto),
        fm_intake: this.checkboolen(data.data.fm_intake),
        fm_studentno: this.checkboolen(data.data.fm_studentno),
        fm_visa_issudate: this.checkboolen(data.data.fm_visa_issudate),
        fm_traveltodiffcounty: this.checkboolen(data.data.fm_traveltodiffcounty),
        fm_travelbyself: this.checkboolen(data.data.fm_travelbyself),
        fm_acc_byfamily: this.checkboolen(data.data.fm_acc_byfamily),
        fm_familyno: this.checkboolen(data.data.fm_familyno),
        fm_specialaccomo: this.checkboolen(data.data.fm_specialaccomo),
        fm_modeoftransport: this.checkboolen(data.data.fm_modeoftransport),
        fm_airline: this.checkboolen(data.data.fm_airline),
        fm_dptcountry: this.checkboolen(data.data.fm_dptcountry),
        fm_dptcity: this.checkboolen(data.data.fm_dptcity),
        fm_dptdate: this.checkboolen(data.data.fm_dptdate),
        fm_dpttime: this.checkboolen(data.data.fm_dpttime),
        fm_connectflight: this.checkboolen(data.data.fm_connectflight),
        fm_connectflightno: this.checkboolen(data.data.fm_connectflightno),
        fm_arri_country: this.checkboolen(data.data.fm_arri_country),
        fm_arri_city: this.checkboolen(data.data.fm_arri_city),
        fm_hotal_name: this.checkboolen(data.data.fm_hotal_name),
        fm_hotal_roomno: this.checkboolen(data.data.fm_hotal_roomno),
        fm_hotal_address: this.checkboolen(data.data.fm_hotal_address),
        fm_hotal_countycode: this.checkboolen(data.data.fm_hotal_countycode),
        fm_hotal_no: this.checkboolen(data.data.fm_hotal_no),
        fm_city_of_un: this.checkboolen(data.data.fm_city_of_un),
        fm_finaltransportmode: this.checkboolen(data.data.fm_finaltransportmode),
        fm_transportno: this.checkboolen(data.data.fm_transportno),
        fm_arri_date: this.checkboolen(data.data.fm_arri_date),
        fm_arri_time: this.checkboolen(data.data.fm_arri_time),
        fm_addtionalinfo: this.checkboolen(data.data.fm_addtionalinfo),
      });
      
 
      this.open(content);
    });
  }

  private checkboolen(value: any){
    if(value == 'true') return true;
    return false;
  }

  editRole(id: number, content: any) {
    this.role_id = id;
    this.rolemode = "update";
    this.Aservice.RolebyId(id).subscribe((data) => {  
      
      this.rolesform.setValue({
        name: data.data.role_name,
        student_add: this.checkboolen(data.data.student_add),
        student_delete: this.checkboolen(data.data.student_delete),
        student_edit: this.checkboolen(data.data.student_edit),
      });

     
      
    this.open(content);

    });

  }


  deleteUniversity(id: number){ 
    this.service.deleteUniversity(id)
  }

  deleteRole(id: number){
    this.Aservice.deleteRole(id);
  }

  deletePlan(id: number){
    this.Aservice.deletePlan(id);
  }

 

}
