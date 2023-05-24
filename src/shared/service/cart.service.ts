import {Injectable, OnInit} from "@angular/core";
import {Knife} from "../model/knife";
import {Accessory} from "../model/accessory";
import {Order} from "../model/order";
import {Address} from "../model/address";

@Injectable()

export class CartService implements OnInit{

  ngOnInit() {

  }

  order:Order={
    shippingStatus:'Initiated',
    contact:'',
    orderDate:new Date(),
    userId:0,
    knifePurchase:[],
    accessoryPurchase:[],
    total:0,
    shippingAddress: {  address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      email:''}
  };
  knife: { knife:Knife,quantity:number }[]=[];
  accessory:{accessory:Accessory, quantity:number}[]=[];
  total:number=0;
  TAX:number=0.08;

  pullFromLocal(){
    for(let [key,value] of Object.entries(localStorage))
    {

      if(key.includes('knife'))
      {

        this.knife.push(JSON.parse(value));
      }
      else if(key.includes('accessory'))
      {
        this.accessory.push(JSON.parse(value));
      }
    }
  }
  calculateTotal(){
    this.total=0;
    this.knife.forEach((element)=>{
      this.total+=element.quantity*element.knife.price;
    })
    this.accessory.forEach((element)=>{

      this.total+=element.quantity*element.accessory.price;
    })
    this.total+=this.total*this.TAX;
    return this.total;
  }
  filterZero(){
    this.knife=this.knife.filter((element)=>{
      if(element.quantity>0)
      {
        return true;
      }
      else{

        localStorage.removeItem(`knife${element.knife.id}`)
        return false
      }
    })
    this.accessory=this.accessory.filter((element)=>{
      if(element.quantity>0)
      {
        return true;
      }
      else
      {
        localStorage.removeItem(`accessory${element.accessory.id}`)

        return false;
      }

    })
  }
  clearCart(){
    this.knife=[];

    this.accessory=[];

    for(let key of Object.keys(localStorage))
    {
      if(key.includes("accessory")||key.includes("knife"))
      {
        localStorage.removeItem(key);
      }
    }
    this.order={
      shippingStatus:'Initiated',
      contact:'',
      orderDate:new Date(),
      userId:0,
      knifePurchase:[],
      accessoryPurchase:[],
      total:0,
      shippingAddress: {  address1:'',
        address2:'',
        city:'',
        state:'',
        zip:'',
        email:''}
    };
  }
  addKnife(knife:Knife,quantity:number=1){
    let target = this.knife.findIndex((element) => {return element.knife.id === knife.id});

    if(target!==-1)
    {
      this.knife[target].quantity=quantity;
      localStorage.setItem(`knife${knife.id}`,JSON.stringify({knife:knife,quantity:quantity}))
    }
    else{
      this.knife.push({knife:knife,quantity:quantity});

      localStorage.setItem(`knife${knife.id}`,JSON.stringify({knife:knife,quantity:quantity}))
    }

  }
  addAccessory(accessory:Accessory,quantity:number=1){
    let target = this.accessory.findIndex((element) => {return element.accessory.id === accessory.id});
    if(target!==-1)
    {
      localStorage.setItem(`accessory${accessory.id}`,JSON.stringify({accessory:accessory,quantity:quantity}))
      this.accessory[target].quantity=quantity;

    }
    else{
      localStorage.setItem(`accessory${accessory.id}`,JSON.stringify({accessory:accessory,quantity:quantity}))
      this.accessory.push({accessory:accessory,quantity:quantity});
    }
  }

  sync(){
    this.knife.forEach((knife)=>{           localStorage.setItem(`knife${knife.knife.id}`,JSON.stringify({knife:knife.knife,quantity:knife.quantity}))

    })
    this.accessory.forEach((accessory)=>{      localStorage.setItem(`accessory${accessory.accessory.id}`,JSON.stringify({accessory:accessory.accessory,quantity:accessory.quantity}))
    })

  }


}
