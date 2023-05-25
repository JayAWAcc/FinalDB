import {Injectable, OnChanges, OnInit} from "@angular/core";
import {Observable} from "rxjs";

import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User, UserResponse} from "../model/user-response";
import {Address} from "../model/address";

@Injectable()
export class AuthService {
  // currentUser: {id:number, username:string, profiles:{id:number, role:string}[] } |undefined;
  isAdmin:boolean=false;
  currentUser: {id:number, username:string, profiles:{id:number, role:string}[] } |undefined;


  loggedIn:boolean=false;
  constructor(private httpClient:HttpClient) {
  }

  login(user:HttpParams):Observable<HttpResponse<UserResponse>>{

  return this.httpClient.post<UserResponse>(`${environment.APL_URL}/login`,user,{withCredentials:true,observe:'response',headers:new HttpHeaders()});
}
getShippingInfo():Observable<Address>{
    return this.httpClient.get<Address>(`${environment.APL_URL}/user-details/${JSON.parse(String(localStorage.getItem('currentUser'))).id}`,{withCredentials:true});

}

checkLogin():Observable<UserResponse>{
  return this.httpClient.get<UserResponse>(`${environment.APL_URL}/checklogin`,{withCredentials:true})
}
checkIfAdmin(user:User){
    if(user&&user.profiles)
    {
      return !!user.profiles.filter((e)=>{return e.role=="ADMIN"}).length;
    }
    else {
      return false;
    }

}

setCurrentUser(){
    this.httpClient.get<UserResponse>(`${environment.APL_URL}/checklogin`,{withCredentials:true}).subscribe(
      next=>{
        console.log(next)
        //this.currentUser=Object(next.user);
        localStorage.setItem('currentUser',JSON.stringify(Object(next.user)));
        this.isAdmin=this.checkIfAdmin(JSON.parse(String(localStorage.getItem('currentUser'))));


}
)}

  isUsernameAvailable(username:String)
{
  return this.httpClient.get(`${environment.APL_URL}/isUsernameAvailable/${username}`);
}
  getUsernameById(id:number){
    return this.httpClient.get(`${environment.APL_URL}/users/getUsernameById/${id}`);
  }

logout():Observable<HttpResponse<any>>{
    return this.httpClient.get<any>(`${environment.APL_URL}/logout`,{withCredentials:true});
}

clearUser(){
    //this.currentUser=undefined;
    this.isAdmin=false;
    localStorage.clear();
}
getCurrentLogin():number|undefined{

    if(localStorage.getItem('currentUser'))
    {
      console.log(JSON.parse(String(localStorage.getItem('currentUser'))).id);
      return JSON.parse(String(localStorage.getItem('currentUser'))).id;
    }
    else{
      return undefined;
    }
}


}

