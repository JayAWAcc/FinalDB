import { Pipe, PipeTransform } from '@angular/core';
import {Accessory} from "../model/accessory";
import {Knife} from "../model/knife";
import {KnifeService} from "../service/knife.service";
import {AccessoryService} from "../service/accessory.service";

@Pipe({
  name: 'knifeSorting'
})
export class KnifeSortingPipe implements PipeTransform {

  constructor(private ks:KnifeService,
              private as:AccessoryService) {
  }
  transform(value:Knife[],ordering:number|undefined):Knife[] {

    if(value.length>0&&ordering==1||ordering==-1)
    {
        return value.sort((a,b)=>{return ordering*(a.price-b.price)})

    }

    return value;


  }

}
