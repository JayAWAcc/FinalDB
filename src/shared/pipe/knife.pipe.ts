import {Pipe, PipeTransform} from "@angular/core";
import {Knife} from "../model/knife";
import {PageService} from "../service/page.service";

@Pipe({
  name:"knifePipe"
})

export class KnifeCategoryPipe implements PipeTransform{
  constructor(private ps:PageService) {
  }
  transform(knife:Knife[],category:string|undefined,value:string|undefined,size:number, page:number=0): Knife[]
  {
    if(!size)
    {
      size=knife.length
    }
    if(category&&value)
    {
      let ret=knife.filter((element)=>{
        if(category==="brand"||category==="knifeType"||category==="steel"||category==="supplier")
        {
          return element[`${category}`] === value;
        }
        else{
          return false;
        }
      })
        let max=ret.length;
        let target=Math.min(max,size*(page+1));

        return ret.slice((page * this.ps.pageSize),target);
    }
    else{

      let max=knife.length;
      let target=Math.min(max,size*(page+1));

    return knife.slice(page * this.ps.pageSize,target);
    }

  }
}
