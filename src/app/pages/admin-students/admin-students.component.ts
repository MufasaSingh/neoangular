import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { formlist } from 'src/app/services/interfaces/formlist.modal';
import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';

import { StudentsService } from '../../services/students.service';
import { UniversityService } from '../../services/university.service';
import { RegionsService } from '../../services/regions.service';
import { countries } from 'src/app/services/interfaces/country.modal';
import { states } from 'src/app/services/interfaces/states.modal';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css'],
})
export class AdminStudentsComponent implements OnInit {
  closeResult = '';
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  

  formlist: formlist[] = [];
  university: UniversityList[] = [];
  country: countries[] = [];
  states: states[] = [];

  constructor(
    private modalService: NgbModal,
    private service: StudentsService,
    private _snackBar: MatSnackBar,
    private Uservice: UniversityService,
    private Rservice: RegionsService
  ) {}

  ngOnInit(): void {
    this.Rservice.getCountry().subscribe(data=>{
      this.country = data.data
    })

    this.Uservice.universityList().subscribe((data) => {
      this.university = data.data;
    });

    this.service.formlist().subscribe((data) => {
      this.formlist = data.data;
    });

    this.form = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null, { validators: [Validators.required] }),
      dob: new FormControl(null),
      address: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      university: new FormControl(null, { validators: [Validators.required] }),
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

  openSnackBar(error_msg: string) {
    this._snackBar.open(error_msg, 'Dismiss', {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSaveStudent() {
 
    if (this.form.invalid) return;
    this.modalService.dismissAll('saved');

    const data = this.form.value;

    const values = {
      email: data.email,
      mobile: data.mobile,
      country_code: '',
      university_id: data.university,
    };

    this.service.createStudent(values).subscribe((data) => {
      this.openSnackBar(data.error_msg);
    });
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

  onchnage(id: any){

    const values = {
      "country_id": id
    }    

    this.Rservice.getState(values).subscribe(data=>{
      this.states = data.data
    })

  }

  deletestudent(id: number){
    this.service.deleteStudent(id)
  }

}
