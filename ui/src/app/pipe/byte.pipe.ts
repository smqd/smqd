import { Pipe, PipeTransform} from '@angular/core';
import { formatNumber } from '@angular/common'

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  transform(value: number, digitInfo: string): string {
    return this.byteUinit(value, digitInfo);
  }
  byteUinit(byteSize:number, digitInfo){
    if(byteSize <= 0) {
      return byteSize + ' Byte';
    }
    if(byteSize < 1000) {
      return formatNumber(byteSize ,'en',digitInfo) + ' Byte';
    }
    if(byteSize < 1000000) {
      return formatNumber(byteSize/1000,'en',digitInfo) + ' KB';
    }
    if(byteSize < 1000000000) {
      return formatNumber(byteSize/1000000,'en',digitInfo) + ' MB';
    }
    if(byteSize < 1000000000000) {
      return formatNumber(byteSize/1000000000 ,'en',digitInfo) + ' GB';
    }
    if(byteSize) {
      return formatNumber(byteSize/1000000000000,'en',digitInfo) + ' TB';
    }
  }
}


