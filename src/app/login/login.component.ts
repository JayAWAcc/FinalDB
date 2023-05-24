import {Component, ElementRef, OnChanges, OnDestroy, SimpleChanges, ViewChild} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AuthService} from "../../shared/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector:"app-login",
  templateUrl:"login.component.html",
  styleUrls:["login.component.scss"]

})

export class LoginComponent{
  username:String|undefined;
  password:String|undefined;
  error:string|undefined;
  constructor(private httpClient:HttpClient,
              private as:AuthService,
              private router:Router) {
  }


  checkLogin(){
    this.as.checkLogin().subscribe(
      next=>{console.log(next)}
    )
  }
  login(){
      const httpData=new HttpParams().
        append('username',String(this.username))
        .append('password',String(this.password));

      this.as.login(httpData).subscribe({
      next:next=>{
        console.log(next )
        if(next.body?.success) {
          this.as.setCurrentUser();

          this.as.loggedIn=true;
              this.router.navigateByUrl('/home');
            }
      else{
      this.error="LOGIN FAILED";
      }
      },
        error:()=>{
        this.error="LOGIN FAILED! username/password invalid";
          }}
      )

    //setTimeout(this.error='',5000);

          }

}





