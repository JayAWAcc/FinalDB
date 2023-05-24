import {Component, OnInit, Pipe, ViewEncapsulation} from "@angular/core";
import {Knife} from "../../shared/model/knife";
import {KnifeService} from "../../shared/service/knife.service";
import {find} from "rxjs";
import {Accessory} from "../../shared/model/accessory";
import {AccessoryService} from "../../shared/service/accessory.service";
import {SearchKnifePipe} from "../../shared/pipe/searchKnife.pipe";
import {PageService} from "../../shared/service/page.service";

@Component({
  selector:"app-home",
  templateUrl:"home.component.html",
  styleUrls:["home.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit{

  knives:Knife[]=[];
  accessories:Accessory[]=[];

  showOutofStock:boolean=false;
  additionalPipe:string|undefined;
  priceOrdering:number=0;
  constructor(private ks:KnifeService,
              private as:AccessoryService,
              public ps:PageService) {

  }

  ngOnInit() {
    this.ks.findAll().subscribe(next=>{
      this.knives=next;})
    this.as.findAll().subscribe(next=>{this.accessories=next; this.ps.totalItem(this.knives)})
    this.ps.currentPage=0;
  }

  size=5;

  searchedValue:string|undefined;
}
