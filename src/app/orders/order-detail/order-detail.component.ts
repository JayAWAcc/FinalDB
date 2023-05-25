import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../shared/model/order";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order:Order|undefined;
  constructor(private os:OrderService,
              private activatedRoute:ActivatedRoute) { }

  currentProgress(progress:string){
    if(progress=='Initiated')
    {
      return 2;
    }
    else if(progress =='Pending')
    {
      return 1;
    }
    else if(progress =='In-Transit')
    {
      return 3;
    }
    else{
      return 4
    }
  }
  ngOnInit(): void {

    this.os.getOrderById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(next=>{this.order=next});
  }

}
