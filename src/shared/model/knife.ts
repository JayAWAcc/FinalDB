export interface Knife{
  id?:number;
  image?: {id:number,image:string}[];
  brand:string;
  knifeType: string;
  steel: string;
  stock:number;
  name:string;
  price:number;
  description:string;
  supplier:string;
}
