import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/order";
import {Knife} from "../model/knife";
import {Accessory} from "../model/accessory";

@Pipe({
    name:"priceCalculate"
  })

export class PricePipe implements PipeTransform{
  transform(order:{knifePurchase:{quantity:number, knife:Knife}[], accessoryPurchase:{quantity:number,accessory:Accessory}[]},
            tax:number=0): number {
    let total=0;
    order.knifePurchase.forEach((element)=>{
      total+=element.quantity*element.knife.price;
    })
    order.accessoryPurchase.forEach((element)=>{
      total+=element.quantity*element.accessory.price;
    })
    return total+=total*tax;

  }
}
