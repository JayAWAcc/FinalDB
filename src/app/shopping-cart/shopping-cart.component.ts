import {Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {CartService} from "../../shared/service/cart.service";
import {Knife} from "../../shared/model/knife";
import {Accessory} from "../../shared/model/accessory";
import {OrderService} from "../../shared/service/order.service";
import {formatDate} from "@angular/common";
import {elementAt} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector:"app-shopping-cart",
  templateUrl:"shopping-cart.component.html",
  styleUrls:["shopping-cart.component.scss"]
})


export class ShoppingCartComponent implements DoCheck, OnDestroy{

  TAX:number=0.08;
  total:number=0;
  constructor(public cs:CartService,
              private os:OrderService,
              private router:Router) {
  }

  checkAccessoryImg(url:string){

    if(url==''||url.toLowerCase()=="nan")
    {
      return "./assets/notFound.png"
    }
    if(url.indexOf('http')==0){
      return url;
    }
    else{
      return `./assets/accessoryImg/${url}`;
    }

  }
  checkKnifeImg(url:string){
    if(url==''||url.toLowerCase()=="nan")
    {
      return "./assets/notFound.png"
    }
    if(url.indexOf('http')==0){
      return url;
    }
    else{
      return `./assets/knifeImage/${url}`;
    }

  }
  addKnife(knife:{ knife:Knife,quantity:number }){
    if(knife.quantity<999&&knife.quantity<knife.knife.stock)
    {
      knife.quantity++;
    }

  }
  subKnife(knife:{ knife:Knife,quantity:number }){
    if(knife.quantity>0)
    {
      knife.quantity--;
    }

  }
  addAccessory(accessory:{accessory:Accessory, quantity:number}){
    if(accessory.quantity<999&&accessory.quantity<accessory.accessory.stock)
    {
      accessory.quantity++;
    }

  }
  subAccessory(accessory:{accessory:Accessory, quantity:number}){
    if(accessory.quantity>0)
    {
      accessory.quantity--;
    }
  }

  deleteKnife(entity:{ knife:Knife,quantity:number })
  {
    localStorage.removeItem(`knife${entity.knife.id}`)

    this.cs.knife=this.cs.knife.filter((element)=>{return element.knife!=entity.knife})
  }

  deleteAccessory(entity:{ accessory:Accessory,quantity:number })
  {
    localStorage.removeItem(`accessory${entity.accessory.id}`)

    this.cs.accessory=this.cs.accessory.filter((element)=>{return element.accessory!=entity.accessory});

  }

  ngDoCheck() {

    this.cs.filterZero();
    this.total=this.cs.calculateTotal();

  }
  ngOnDestroy(){

    this.cs.sync();
  }

  toCheckout(){
    this.cs.order={
      shippingStatus:"Pending",
      orderDate:new Date(formatDate(Date(),'MM-dd-yyyy h:mm:ss', 'en')),
      userId:1,
      knifePurchase:this.cs.knife,
      accessoryPurchase:this.cs.accessory,
      total:this.cs.calculateTotal()

    };
    this.router.navigateByUrl('/shopping-cart/checkout');
}
clear(){
    this.cs.clearCart();
}
}
