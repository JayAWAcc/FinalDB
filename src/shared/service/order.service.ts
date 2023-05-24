import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserResponse} from "../model/user-response";


@Injectable()
export class OrderService {

  constructor(private http:HttpClient) {

  }

  public getOrderById(id:number):Observable<Order>{
    return this.http.get<Order>(`${environment.APL_URL}/orders/${id}`,{withCredentials:true})
  }

  public getOrdersByUserId(userId:number):Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.APL_URL}/orders/userId/${userId}`,{withCredentials:true});
  }

  public save(order:Order):Observable<UserResponse>
  {
    return this.http.post<UserResponse>(`${environment.APL_URL}/orders`,order,{withCredentials:true});
  }

}
