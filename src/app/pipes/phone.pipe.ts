import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.charAt(0) != 0 ? '0' + value : '' + value;
    let newStr = '';
    let i = 0;
    for(i = 0; i < (Math.floor(value.length/3) - 1); i++){
       newStr = newStr+ value.substr(i*3, 3) + ' - ';
    }
    return newStr + value.substr(i * 3);
  }

}
