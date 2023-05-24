import {Pipe, PipeTransform} from "@angular/core";
import {Accessory} from "../model/accessory";
import {elementAt} from "rxjs";

@Pipe({
  name:"searchAccessoryPipe"
})

export class SearchAccessoryPipe implements PipeTransform{
  transform(value: Accessory[],searchValue:string, showOutofStock:boolean=false): any {
    if(value!=[])
    {
      let ret=[];
      if(isNaN(parseFloat(searchValue)) ==false){
        ret= value.filter((element)=>
        {
          return (element.price+'').indexOf(searchValue)>=0;
        })
      }
      else{
        ret= value.filter((element)=>{
          return element.accessoryName.toLowerCase().includes(searchValue.toLowerCase())||
            element.description.toLowerCase().includes(searchValue.toLowerCase());

        })

      }
      if(!showOutofStock){

        ret=ret.filter((element)=>{return element.stock>0})
      }
      return ret;
    }
  }
}
