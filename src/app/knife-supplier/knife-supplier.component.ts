import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../shared/service/page.service";


@Component({
  selector:"app-knife-supplier",
  templateUrl: "knife-supplier.component.html",
  styleUrls: ["knife-supplier.component.scss"]
})

export class KnifeSupplierComponent implements OnInit{

  constructor(private route:ActivatedRoute,
              private routerSetting:Router,
              public ps:PageService)
  {
    routerSetting.routeReuseStrategy.shouldReuseRoute=()=>false;

  }

  ngOnInit() {
    let temp=this.route.snapshot.paramMap.get('supplier')
    this.value=temp?temp:undefined;
    this.ps.currentPage=0;
  }
  category:string="supplier";
  value:string|undefined;
}
