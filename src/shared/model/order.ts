import {Knife} from "./knife";
import {Accessory} from "./accessory";
import {Address} from "./address";

export interface Order{
  id?:number;
  shippingStatus:string;
  contact?:string;
  orderDate:Date;
  userId:number;
  knifePurchase:{quantity:number, knife:Knife}[];
  accessoryPurchase:{quantity:number,accessory:Accessory}[];
  total:number;
  shippingAddress?:Address;


}
