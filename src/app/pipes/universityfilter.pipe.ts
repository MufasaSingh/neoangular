import { Pipe, PipeTransform } from '@angular/core';
import { UniversityList } from '../services/interfaces/universitylist.modal';

@Pipe({
  name: 'universityfilter'
})
export class UniversityfilterPipe implements PipeTransform {

  transform(value: any, args?: any) {

    if (!args) {
      return value
    }

    return value.filter((val: UniversityList)=>{
      let rVal = ( val.address?.toLocaleLowerCase().includes(args) || val.country_name?.toLocaleLowerCase().includes(args) || val.mobile?.toLocaleLowerCase().includes(args) || val.state_name?.toLocaleLowerCase().includes(args) ||  val.university_email?.toLocaleLowerCase().includes(args) || val.university_name?.toLocaleLowerCase().includes(args) );
      return rVal;
    })    
     
  }

}
