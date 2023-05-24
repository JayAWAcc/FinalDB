import {Pipe, PipeTransform} from "@angular/core";
import {Accessory} from "../model/accessory";
import {PageService} from "../service/page.service";


@Pipe({
  name:"accessoryPipe"
})

export class AccessoryPipe implements PipeTransform{
  constructor(public ps:PageService) {
  }
  transform(accessories:Accessory[],category:String|undefined,value:String|undefined,size:number, page:number=0):Accessory[]{


    if(value&&category)
    {
      if(category=="type"){
        let ret=accessories.filter((accessory)=>{
          return accessory.type.some((accType)=>{
            return accType.type.type.toLowerCase()===value.toLowerCase();
          })
        });
        let max=ret.length;
        let target=Math.min(max,size*(page+1));

        return ret.slice((page * this.ps.pageSize),target);

      }
      else if (category=="supplier")
      {
        let ret=accessories.filter((accessory)=>{
          return accessory.supplier.toLowerCase()==value.toLowerCase();
          }).slice(0,size);
        let max=ret.length;
        let target=Math.min(max,size*(page+1));

        return ret.slice((page * this.ps.pageSize),target);

      }
      else {
        return [];
      }

    }
    else {
      let max=accessories.length;
      let target=Math.min(max,size*(page+1));

      return accessories.slice((page * this.ps.pageSize),target);

    }

    }


}
