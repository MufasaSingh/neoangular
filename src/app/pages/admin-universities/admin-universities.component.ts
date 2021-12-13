import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UniversityService } from '../../services/university.service';
import { RegionsService } from '../../services/regions.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { UniversityList } from 'src/app/services/interfaces/universitylist.modal';
import { countries } from 'src/app/services/interfaces/country.modal';
import { states } from 'src/app/services/interfaces/states.modal';

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

  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private modalService: NgbModal,
    private service: UniversityService,
    private _snackBar: MatSnackBar,
    private Rservice: RegionsService
  ) {}

  ngOnInit(): void {

    this.Rservice.getCountry().subscribe(data=>{
      this.country = data.data
    })

    this.service.universityList().subscribe((data) => {
      this.list = data.data;
    });

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

  onchnage(id: any){

    const values = {
      "country_id": id
    }    

    this.Rservice.getState(values).subscribe(data=>{
      this.states = data.data
    })

  }

}
