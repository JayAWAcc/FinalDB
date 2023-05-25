import {Component, Input, OnInit} from "@angular/core";
import {AccessoryService} from "../../shared/service/accessory.service";
import {Accessory} from "../../shared/model/accessory";
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../../shared/service/page.service";

@Component({
  selector:"app-accessories",
  templateUrl: "accessories.component.html",
  styleUrls:["accessories.component.scss"]

})

export class AccessoriesComponent implements OnInit{


  accessories:Accessory[]=[];

  @Input()
  size:number=0;

  @Input()
  category:String|undefined;
  @Input()
  value:String|undefined;


  constructor(private as:AccessoryService,
              private ar:ActivatedRoute,
              public ps:PageService) {

  }

  ngOnInit() {
    this.ps.currentPage=0;
    if(!(this.value&&this.category))
    {
      this.ar.queryParamMap.subscribe(
        param=>{
          this.value=String(param.get('value'))
          this.category=String(param.get('category'));
          this.as.findAll().subscribe(
            next=>{this.ps.totalItem(next.filter(e=>{console.log(e);return e.type.some((i)=>
            {return i.type.type.toLowerCase()==String(this.value).toLowerCase()})
            }))}
          )

        }
      )

    }
    this.as.findAll().subscribe((accessories)=>{
      this.accessories=accessories;
      this.size=accessories.length;
    })


  }


}
