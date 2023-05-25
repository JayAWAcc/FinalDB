import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Comment} from "../model/comment";
import {UserResponse} from "../model/user-response";

@Injectable()
export class CommentService{
  constructor(private httpClient:HttpClient) {
  }

  getAccessoryCommentByAccessoryId(id:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${environment.APL_URL}/accessories/comment/${id}`);
  }

  sendAccessoryComment(comment:Comment,accessoryId:number):Observable<UserResponse>{
    return this.httpClient.post<UserResponse>(`${environment.APL_URL}/accessories/comment/${accessoryId}`,comment);
  }

  hasPurchasedKnife(knifeId:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.APL_URL}/orders/hasPurchasedKnife/${knifeId}`,{withCredentials:true});
  }
  hasPurchasedAccessory(accessoryId:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.APL_URL}/orders/hasPurchasedAccessory/${accessoryId}`,{withCredentials:true});
  }
  getKnifeAverageRating(id:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.APL_URL}/knives/comment/average_rate/${id}`);
  }
  getAccessoriesAverageRating(id:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.APL_URL}/accessories/comment/average_rate/${id}`);
  }

  getKnifeCommentByAccessoryId(id:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${environment.APL_URL}/knives/comment/${id}`);
  }
  sendKnifeComment(comment:Comment,knifeId:number):Observable<UserResponse>{
    return this.httpClient.post<UserResponse>(`${environment.APL_URL}/knives/comment/${knifeId}`,comment,{withCredentials:true});
  }

  checkWriteCommentEligibility(id:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.APL_URL}/`);
  }

}
