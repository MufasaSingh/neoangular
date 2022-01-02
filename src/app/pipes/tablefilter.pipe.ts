import { Pipe, PipeTransform } from '@angular/core';
import { formlist } from '../services/interfaces/formlist.modal';

@Pipe({
  name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {

  transform(value: any, args?: any) {
    if (!args) {
      return value
    } 
    
    return value.filter((val: formlist)=>{
      let rVal = ( val.Address?.toString().includes(args) || val.contact?.toString().includes(args) || val.course_name?.toString().includes(args) || val.form_status?.toString().includes(args) || val.s_email.toString()?.includes(args) || val.student_name?.toString().includes(args) || val.university_name?.toString().includes(args));
      return rVal;
    })

  }

}
