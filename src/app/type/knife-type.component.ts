import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../shared/service/page.service";

@Component({
  selector:"app-knife-type",
  templateUrl:"knife-type.component.html",
  styleUrls:["knife-type.component.scss"]
})

export class KnifeTypeComponent implements OnInit{

  constructor(private route:ActivatedRoute,
              private routerSetting:Router,
              public ps:PageService)
  {
    routerSetting.routeReuseStrategy.shouldReuseRoute=()=>false;

  }

  ngOnInit() {
    let temp=this.route.snapshot.paramMap.get('type')
    console.log(temp);
    this.value=temp?temp:undefined;
    this.ps.currentPage=0;
  }

  value:string|undefined;
  category:string|undefined="knifeType";
}
