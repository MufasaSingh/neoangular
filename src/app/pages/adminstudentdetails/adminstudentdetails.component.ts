import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { normal_form } from 'src/app/services/interfaces/normal_form.modal';
import { studentform } from 'src/app/services/interfaces/studentform.modal';
import { StudentsService } from 'src/app/services/students.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminstudentdetails',
  templateUrl: './adminstudentdetails.component.html',
  styleUrls: ['./adminstudentdetails.component.css'],
})
export class AdminstudentdetailsComponent implements OnInit {
  normal_form: normal_form[] = [];
  items: studentform;

  formUpdate: FormGroup;

  form_id: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private service: StudentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('formid')) {
        this.form_id = paramMap.get('formid');

        const values = {
          form_id: this.form_id,
        };

        this.service.formdetail(values).subscribe((data) => {
          this.items = data.data; 
          this.formUpdate.setValue({
            form_id: data.data.form_id,
            student_id: data.data.student_id,
            course_id: data.data.course_id,
            s_fname: data.data.s_fname,
            s_lname: data.data.s_lname,
            s_email: data.data.s_email,
            s_country_code: data.data.s_country_code,
            s_mobile: data.data.s_mobile,
            s_gender: data.data.s_gender,
            s_dob: data.data.s_dob,
            s_country: data.data.s_country,
            s_p_address: data.data.s_p_address,
            s_p_state: data.data.s_p_state,
            s_p_city: data.data.s_p_city,
            s_p_postcode: data.data.s_p_postcode,
            same_address: data.data.same_address,
            s_c_address: data.data.s_c_address,
            s_c_state: data.data.s_c_state,
            s_c_city: data.data.s_c_city,
            s_c_postcode: data.data.s_c_postcode,
            campus_address: data.data.campus_address,
            campus_program: data.data.campus_program,
            campus_intake: data.data.campus_intake,
            student_number: data.data.student_number,
            visa_issue: data.data.visa_issue,
            travelling: data.data.travelling,
            self_travelling: data.data.self_travelling,
            family_member: data.data.family_member,
            disability: data.data.disability,
            mode_of_transfer: data.data.mode_of_transfer,
            airline: data.data.airline,
            departure_contry: data.data.departure_contry,
            departure_city: data.data.departure_city,
            departure_date: data.data.departure_date,
            deaprture_time: data.data.deaprture_time,
            no_of_flights: data.data.no_of_flights,
            arrival_country: data.data.arrival_country,
            arrival_city: data.data.arrival_city,
            hotal_name: data.data.hotal_name,
            hotal_room: data.data.hotal_room,
            hotal_address: data.data.hotal_address,
            hotal_country_code: data.data.hotal_country_code,
            hotal_number: data.data.hotal_number,
            university_city: data.data.university_city,
            final_transport: data.data.final_transport,
            transport_number: data.data.transport_number,
            arrival_date: data.data.arrival_date,
            arrival_time: data.data.arrival_time,
            information: data.data.information,
            signature: data.data.signature,
            form_status: data.data.form_status,
            updated_at: data.data.updated_at,
            created_at: data.data.created_at,
            is_active: data.data.is_active,
          })
          this.service
            .getnormal_form(this.items.student_id)
            .subscribe((data) => {
              this.normal_form = data.data;
            });
        });
      }
    });

    this.formUpdate = new FormGroup({
      form_id: new FormControl(""),
      student_id: new FormControl(""),
      course_id: new FormControl(""),
      s_fname: new FormControl(""),
      s_lname: new FormControl(""),
      s_email: new FormControl(""),
      s_country_code: new FormControl(""),
      s_mobile: new FormControl(""),
      s_gender: new FormControl(""),
      s_dob: new FormControl(""),
      s_country: new FormControl(""),
      s_p_address: new FormControl(""),
      s_p_state: new FormControl(""),
      s_p_city: new FormControl(""),
      s_p_postcode: new FormControl(""),
      same_address: new FormControl(""),
      s_c_address: new FormControl(""),
      s_c_state: new FormControl(""),
      s_c_city: new FormControl(""),
      s_c_postcode: new FormControl(""),
      campus_address: new FormControl(""),
      campus_program: new FormControl(""),
      campus_intake: new FormControl(""),
      student_number: new FormControl(""),
      visa_issue: new FormControl(""),
      travelling: new FormControl(""),
      self_travelling: new FormControl(""),
      family_member: new FormControl(""),
      disability: new FormControl(""),
      mode_of_transfer: new FormControl(""),
      airline: new FormControl(""),
      departure_contry: new FormControl(""),
      departure_city: new FormControl(""),
      departure_date: new FormControl(""),
      deaprture_time: new FormControl(""),
      no_of_flights: new FormControl(""),
      arrival_country: new FormControl(""),
      arrival_city: new FormControl(""),
      hotal_name: new FormControl(""),
      hotal_room: new FormControl(""),
      hotal_address: new FormControl(""),
      hotal_country_code: new FormControl(""),
      hotal_number: new FormControl(""),
      university_city: new FormControl(""),
      final_transport: new FormControl(""),
      transport_number: new FormControl(""),
      arrival_date: new FormControl(""),
      arrival_time: new FormControl(""),
      information: new FormControl(""),
      signature: new FormControl(""),
      form_status: new FormControl(""),
      updated_at: new FormControl(""),
      created_at: new FormControl(""),
      is_active: new FormControl(""),
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  updateUpdate() {

    if(this.formUpdate.invalid) return false;
      const data: studentform = this.formUpdate.value;
      const dataVal = {
        form_id: data.form_id,
        student_id: data.student_id,
        course_id: data.course_id,
        s_fname: data.s_fname,
        s_lname: data.s_lname,
        s_email: data.s_email,
        s_country_code: data.s_country_code,
        s_mobile: data.s_mobile,
        s_gender: data.s_gender,
        s_dob: data.s_dob,
        s_country: data.s_country,
        s_p_address: data.s_p_address,
        s_p_state: data.s_p_state,
        s_p_city: data.s_p_city,
        s_p_postcode: data.s_p_postcode,
        same_address: data.same_address,
        s_c_address: data.s_c_address,
        s_c_state: data.s_c_state,
        s_c_city: data.s_c_city,
        s_c_postcode: data.s_c_postcode,
        campus_address: data.campus_address,
        campus_program: data.campus_program,
        campus_intake: data.campus_intake,
        student_number: data.student_number,
        visa_issue: data.visa_issue,
        travelling: data.travelling,
        self_travelling: data.self_travelling,
        family_member: data.family_member,
        disability: data.disability,
        mode_of_transfer: data.mode_of_transfer,
        airline: data.airline,
        departure_contry: data.departure_contry,
        departure_city: data.departure_city,
        departure_data: data.departure_date,
        deaprture_time: data.deaprture_time,
        no_of_flights: data.no_of_flights,
        arrival_country: data.arrival_country,
        arrival_city: data.arrival_city,
        hotal_name: data.hotal_name,
        hotal_room: data.hotal_room,
        hotal_address: data.hotal_address,
        hotal_country_code: data.hotal_country_code,
        hotal_number: data.hotal_number,
        university_city: data.university_city,
        final_transport: data.final_transport,
        transport_number: data.transport_number,
        arrival_data: data.arrival_date,
        arrival_time: data.arrival_time,
        information: data.information,
        signature: data.signature,
        form_status: data.form_status,
        updatad_at: data.updated_at,
        created_at: data.created_at,
        is_active: data.is_active,
      }
 

      this.service.updateform(dataVal).subscribe(data=> {
        this.modalService.dismissAll();
      })

  }
}
