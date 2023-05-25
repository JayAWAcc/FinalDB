import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../../../shared/model/order";
import {OrderService} from "../../../shared/service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit{

  orders:Order[]=[];

  constructor(private os:OrderService,
              private ar: ActivatedRoute,
              private as:AuthService) { }

  ngOnInit(): void {
    console.log('inti');
    this.os.getOrdersByUserId(Number(this.as.getCurrentLogin())).subscribe(next=>{console.log(next);this.orders= next;});
  }


}
