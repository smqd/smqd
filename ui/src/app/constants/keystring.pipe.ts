import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keystring'
})
export class KeystringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //var obj = this.flattenObject(value);
    //console.log('keystring', obj, Object.keys(obj));
    return this.flattenObject(value);
  }

  flattenObject(ob) {
    var toReturn = {};
	
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      
      if ((typeof ob[i]) == 'object') {
        var flatObject = this.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          
          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    
    return toReturn;
  }

}
