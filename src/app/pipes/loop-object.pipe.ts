import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loopObject'
})
export class LoopObjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let listItem = [];
    for (let key in value) {
      listItem.push({
        key: key,
        value: value[key]
      })
    }
    return listItem;
  }

}
