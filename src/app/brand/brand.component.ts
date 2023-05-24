import {AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from "@angular/core";
import {KnifeService} from "../../shared/service/knife.service";
import {Knife} from "../../shared/model/knife";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../shared/service/page.service";


@Component({
  selector:"app-brand",
  templateUrl: "brand.component.html",
  styleUrls:["brand.component.scss"]
})

export class BrandComponent implements OnInit{
  constructor(private router:ActivatedRoute,
              private routerSetting:Router,
              public ps:PageService)
  {
    routerSetting.routeReuseStrategy.shouldReuseRoute=()=>false;

  }

    category:string="brand";
    value:string|undefined;

    ngOnInit() {

      this.ps.currentPage=0;
      let temp=this.router.snapshot.paramMap.get('brandName');
      this.value=temp?temp:undefined;
      this.ps.currentPage=0;
    }


}
