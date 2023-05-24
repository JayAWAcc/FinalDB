export interface Accessory{
  id:number;
  accessoryName:string;
  price:number;
  description:string;
  imageUrl:string;
  type:{id:number ,type:{id:number,type:string}}[];
  stock:number;
  supplier:string;
}
