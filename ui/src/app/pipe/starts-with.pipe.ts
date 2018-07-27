import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startsWith'
})
export class StartsWithPipe implements PipeTransform {

  transform(fullText: string, textMatch: string): any {
    return fullText.startsWith(textMatch);
  }

}
