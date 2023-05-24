import {AfterContentChecked, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector:"app-header",
  templateUrl:"header.component.html",
  styleUrls:["header.component.scss"]
})

export class HeaderComponent{
  constructor(private router:Router,
              public as:AuthService) {

  }

  currentUser(){
    return localStorage.getItem('currentUser')
  }

  toShoppingCart(){
    this.router.navigateByUrl('/shopping-cart');
  }

  logout(){
    this.as.clearUser();
    this.as.logout().subscribe(
      next=>{

          localStorage.clear();
          this.router.navigateByUrl('/login');
      }

    );



  }
}
