import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../shared/service/order.service";
import {Order} from "../../shared/model/order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input()
  order:Order|undefined;
  constructor() { }

  ngOnInit(): void {


  }

}
