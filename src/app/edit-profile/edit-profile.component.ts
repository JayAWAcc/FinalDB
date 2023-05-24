import { Component, OnInit } from '@angular/core';
import {Address} from "../../shared/model/address";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {HTTPResponse} from "../../shared/service/knife.service";
import {UserResponse} from "../../shared/model/user-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  address:Address={id:0,address1:'', address2:'' , city:'',state: '', zip:'', email:'', phone:''};
  constructor(private fb:FormBuilder,
              private httpClient:HttpClient,
              private router:Router) { }

  error='';
  zipPattern = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
  states=new Set(['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']);

 /* editInfo= this.fb.group({
    address1:['',[Validators.required]],
    address2:['',[Validators.required]],
    email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
    phone:['',[Validators.required]],
    city:['',[Validators.required]],
    state:['',[Validators.required, Validators.maxLength(2)]],
    zip: ['', [Validators.required, Validators.pattern(this.zipPattern)]]

  })*/
  ngOnInit(): void {
    this.httpClient.get<Address>(`${environment.APL_URL}/user-details/${JSON.parse(String(localStorage.getItem('currentUser'))).id}`,{withCredentials:true}).subscribe(
      next=>{this.address=next;
        console.log(next)
      }
    );
  }

  onSubmit(){
    console.log(this.address);
    this.httpClient.put<UserResponse>(`${environment.APL_URL}/user-details`,this.address,{withCredentials:true}).subscribe(
      next=>{if(next.success){
        this.router.navigateByUrl('/home');

      }
      else {
        this.error="ERROR UPDATING THE USER INFO";
      }
      }
    )
  }

}
