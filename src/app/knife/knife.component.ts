import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {KnifeService} from "../../shared/service/knife.service";
import {Knife} from "../../shared/model/knife";
import {PageService} from "../../shared/service/page.service";
import {AccessoryService} from "../../shared/service/accessory.service";

@Component({
  selector:"app-knife",
  templateUrl:"knife.component.html",
  styleUrls:["knife.component.scss"]
})

export class KnifeComponent implements OnInit{

  knives:Knife[]=[];
  constructor(private ks:KnifeService,
              public ps:PageService,
              private as:AccessoryService) {

  }

  @Input()
  category:string|undefined;

  @Input()
  price:number=0;
  @Input()
  size:number=0;

  @Input()
  value:string|undefined;




  ngOnInit() {

    if(this.value)
    {
      switch (this.category){
        case "brand":
        {
          this.ks.findKnifeByBrand(this.value).subscribe(
            {
              next:(knifes)=>{
                this.ps.totalItem(knifes)
                this.knives=knifes;

              }
            }
          )
          break;
        }
        case "knifeType":
        {
          this.ks.findKnifeByType(this.value).subscribe(
            {
              next:(knifes)=>{
                this.ps.totalItem(knifes)
                this.knives=knifes;
                console.log("find By type");

              }
            }
          )
          break;
        }
        case "steel":
        {
          this.ks.findKnifeBySteel(this.value).subscribe(
            {
              next:(knifes)=>{
                this.ps.totalItem(knifes)
                this.knives=knifes;
                console.log("find By steel");

              }
            }
          )
          break;
        }
        case "supplier":
        {
          this.ks.findKnifeBySupplier(this.value).subscribe(
            {
              next:(knifes)=>{

                this.knives=knifes;
                this.as.findAll().subscribe((accessories)=>{
                  this.ps.totalItem(knifes,accessories.filter(e=>{return e.supplier==this.value}));

                })
                console.log("find By Supplier");
              }
            }
          )
          break;
        }
        default:
        {
          this.ks.findAll().subscribe(
            {
              next:(knifes)=>{

                this.ps.totalItem(knifes)
                this.knives=knifes;
              }
            }
          )
        }
      }

    }
    else{
      this.ks.findAll().subscribe(
        {
          next:(knifes)=>{
            this.ps.totalItem(knifes);
            this.knives=knifes;
          }
        }
      )
    }

  }
}
