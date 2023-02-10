
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dashString'})
export class DashStringPipe implements PipeTransform {
  transform(value: any): any {
    if(value === undefined){return}
    return value.split(" ").join("-").toLowerCase();
  }
}
