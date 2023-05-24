import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../shared/service/page.service";

@Component({
  selector:"app-steel",
  templateUrl:"steel.component.html",
  styleUrls:["steel.component.scss"]
})

export class SteelComponent implements OnInit{

  constructor(private route:ActivatedRoute,
              public ps:PageService,
    private routerSetting:Router)
  {
    routerSetting.routeReuseStrategy.shouldReuseRoute=()=>false;

  }

  ngOnInit() {
    let temp=this.route.snapshot.paramMap.get('steel')
    console.log(temp);
    this.value=temp?temp:undefined;
    console.log(this.value)
    this.ps.currentPage=0;
  }
  category:string="steel";
  value:string|undefined;
}
