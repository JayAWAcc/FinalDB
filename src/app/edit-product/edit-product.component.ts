import { Component, OnInit } from '@angular/core';
import {Knife} from "../../shared/model/knife";
import {Accessory} from "../../shared/model/accessory";
import {KnifeService} from "../../shared/service/knife.service";
import {PageService} from "../../shared/service/page.service";
import {AccessoryService} from "../../shared/service/accessory.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  knives:Knife[]=[];
  accessories:Accessory[]=[];
  constructor(private ks:KnifeService,
              public ps:PageService,
              private as:AccessoryService) { }

  checkImage(knife:Knife|undefined){
    if(knife?.image==undefined||knife.image[0].image=="NaN"||knife.image[0].image=="")
    {
      return "./assets/notFound.png"
    }
    else if(knife.image[0].image.indexOf('http')==0){
      return knife.image[0].image;
    }
    else{
      return `./assets/knifeImage/${knife.image[0].image}`;
    }

  }

  checkAccessoryImg(url:String){
    if(url==''||url=="NaN")
    {
      return "./assets/notFound.png"

    }
    else if(url.indexOf('http')==0){
      return url;
    }
    else{
      return `./assets/knifeImage/${url}`;
    }
  }

  changeMenu(){

  }
  knifeMenu=true;

  changeKnife(knife:Knife){
    this.ks.updateKnife(knife).subscribe(next=>{console.log(next)});

  }
  changeAccessory(accessory:Accessory){
    this.as.updateAccessory(accessory)
  }
  ngOnInit(): void {
  this.ks.findAll().subscribe(
    next=>{this.knives=next;
    this.ps.totalItem(next);
    }
  );


  }
/*  changeEntries(entriesType:string){
    if(entriesType=='knife')
    {

    }
    else if(entriesType=='accessory')
    {

    }

  }*/

}
