import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { UniversityService } from 'src/app/services/university.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { countries } from 'src/app/services/interfaces/country.modal';
import { states } from 'src/app/services/interfaces/states.modal';
import { roles } from 'src/app/services/interfaces/roles.modal';
import { plans } from 'src/app/services/interfaces/plan.modal';
import { RegionsService } from 'src/app/services/regions.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adminuniversitydetails',
  templateUrl: './adminuniversitydetails.component.html',
  styleUrls: ['./adminuniversitydetails.component.css'],
})
export class AdminuniversitydetailsComponent implements OnInit {
  private university_id: any;
  mainUn: UniversityList;
  subUn: UniversityList[] = [];

  list: UniversityList[] = [];
  country: countries[] = [];
  states: states[] = [];
  roles: roles[] = [];
  plans: plans[] = [];

  form: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private activeRouter: ActivatedRoute,
    private Uservice: UniversityService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private Rservice: RegionsService,
    private Aservice: AdminService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      country: [''],
      city: [''],
      plans: [''],
      universityRoles: this._fb.array([]),
    });

    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('u_id')) {
        this.university_id = paramMap.get('u_id');

        this.Uservice.universitygetbyid(this.university_id).subscribe(
          (data) => {
            this.mainUn = data.un_data;
            this.subUn = data.pa_data;

            this.form.patchValue({
              name: this.mainUn.university_name,
              email: this.mainUn.university_email,
              mobile: this.mainUn.mobile,
              address: this.mainUn.address,
              country:  this.mainUn.country_id,
              city: this.mainUn.state_id,
              plans: this.mainUn.un_plan,
            });
            this.onchnage(this.mainUn.country_id)
            console.log(this.subUn);
            
          }
        );
      }
    });

    this.Rservice.getCountry().subscribe((data) => {
      this.country = data.data;
    });

    this.Aservice.listPlan().subscribe((data) => {
      this.plans = data.data;
    });

    this.Aservice.listRole().subscribe((data) => {
      this.roles = data.data;

      for (let index = 0; index < this.roles.length; index++) {
        const control = <FormArray>this.form.controls['universityRoles'];
        let email = this.subUn.map(item=>{
          if(item.un_role = this.roles[index]['role_id']){
            return item.university_email
          }
        })
        const roles = <FormGroup>this._fb.group({
          role_active: [''],
          role_id: [`${this.roles[index]['role_id']}`],
          role_email: [email] 
        });
        control.push(roles);
      }
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openSnackBar(error_msg: string) {
    this._snackBar.open(error_msg, 'Dismiss', {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getRoles(): FormArray {
    return this.form.get('universityRoles') as FormArray;
  }

  addUniversity() {
    if (this.form.invalid) return;

    this.modalService.dismissAll('saved');
    const data = this.form.value;

    const stt = <{ role_active: boolean; role_id: number; role_email: string }[]>data.universityRoles;

    let rolarr = stt.filter((items: any) => {
      if (items.role_active === true) return items;
    });

    const values = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      country_id: data.country,
      state_id: data.city,
      plan_id: data.plans,
      roles: rolarr,
    };
  }

  onchnage(id: any) {
    const values = {
      country_id: id,
    };

    this.Rservice.getState(values).subscribe((data) => {
      this.states = data.data;
    });
  }
}
