import {Pipe, PipeTransform} from "@angular/core";
import {Knife} from "../model/knife";
import {Accessory} from "../model/accessory";

@Pipe({
  name:"searchKnifePipe"
})

export class SearchKnifePipe implements PipeTransform{
  transform(value: Knife[], searchValue:string,showOutofStock:boolean=false): any {
    let ret=[];
    if(value.length!=0)
    {
      if(isNaN(parseFloat(searchValue)) ==false){
      ret= value.filter((element)=>
      {

        return (element.price+'').indexOf(searchValue)>=0||
          element.steel.indexOf(searchValue)>=0;
      })}
    else{
      ret= value.filter((element)=>{
        return element.steel.toLowerCase().includes(searchValue.toLowerCase())||
          element.name.toLowerCase().includes(searchValue.toLowerCase())||
          element.description.toLowerCase().includes(searchValue.toLowerCase());

      })

    }
    if(!showOutofStock)
    {
      ret =ret.filter((element)=>{return element.stock>0})
    }
    return ret;
    }


}}
