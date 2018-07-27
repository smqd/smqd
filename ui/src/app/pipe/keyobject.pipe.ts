import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyobject'
})
export class KeyobjectPipe implements PipeTransform {

  transform(obj: any, path:any, value: any, args?: any): any {
    return this.setLeaf(obj, path, value);
  }

  setLeaf(obj, path, value) {
    const pList = path.split('.');
    const key = pList.pop();
    const pointer = pList.reduce((accumulator, currentValue) => {
      if (accumulator[currentValue] === undefined)
        accumulator[currentValue] = {};
      return accumulator[currentValue];
    }, obj);
    pointer[key] = value;

    return obj;
  }

}
