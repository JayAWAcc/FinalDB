import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../shared/service/auth.service";
import {Address} from "../../../shared/model/address";
import {OrderService} from "../../../shared/service/order.service";
import {formatDate} from "@angular/common";
import {CartService} from "../../../shared/service/cart.service";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  zipPattern = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
  states=new Set(['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']);
  statement:String|undefined;
  cardNumberGroup = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      this.luhnValidator()
    ]),
    month:new FormControl('',[
      Validators.required,
      Validators.max(12),
      Validators.min(1)
    ])

  });
  constructor(private httpClient:HttpClient,
              private as:AuthService,
              private os:OrderService,
              private cs:CartService,
              private router:Router) { }

  address:Address={address1:'', address2:'' , city:'',state: '', zip:'', email:''};
  validateEmail(email:string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  ngOnInit(): void {
    this.as.getShippingInfo().subscribe(next=>{this.address=next;console.log(next);});


  }

  luhnValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const isValid = this.luhnCheck(control.value);
      return isValid ? null:  {'luhnCheck': isValid};
    };
  }


  luhnCheck (cardNumber: string): boolean {
  if(!cardNumber.length){
    return false;
  }

  cardNumber = cardNumber.replace(/\s/g,'');

  const lastDigit = Number(cardNumber[cardNumber.length - 1]);


  const reverseCardNumber = cardNumber
    .slice(0,cardNumber.length - 1)
    .split('')
    .reverse()
    .map(x => Number(x));

  let sum = 0;

    for(let i = 0; i <= reverseCardNumber.length -1; i += 2){
      reverseCardNumber[i] = reverseCardNumber[i]*2;
      if(reverseCardNumber[i] > 9){
        reverseCardNumber[i] = reverseCardNumber[i] - 9;
      }
    }

    sum = reverseCardNumber
      .reduce((acc, currValue) => (acc + currValue), 0);

    return ((sum + lastDigit) % 10 === 0);
  };

  submitOrder(){
    console.log((this.address.email&&this.validateEmail(this.address.email)));
    console.log(this.address.zip&&this.address.zip.match(this.zipPattern));
    console.log(this.cs.order)
    if((this.address.email&&this.validateEmail(this.address.email))&&
      (this.address.zip&&this.address.zip.match(this.zipPattern))&&
      this.cs.order)
    {
      this.cs.order.orderDate=new Date(formatDate(Date(),'MM-dd-yyyy h:mm:ss', 'en'))
      this.cs.order.shippingAddress= {address1:this.address.address1, address2:this.address.address2,city:this.address.city,
      state:this.address.state,zip:this.address.zip}
      this.cs.order.contact=this.address.email;
      this.cs.order.userId=JSON.parse(String(localStorage.getItem('currentUser'))).id;
      this.os.save(

        this.cs.order
    ).subscribe(next=>{
        if(next.hasOwnProperty("success")&&next.success)
        {
          if (next.success) {
            this.cs.clearCart();

            this.router.navigateByUrl("/order-success");

          }
        }
        else{
          this.statement="ORDER PLACEMENT ERROR!";
          setTimeout(()=>{this.statement=''},5000);
        }

      })
    }
    else {
      this.statement="FIELD INVALID PLEASE DOUBLE CHECK YOUR INFORMATION";
      setTimeout(()=>{this.statement=''},5000);
    }

  }


}
