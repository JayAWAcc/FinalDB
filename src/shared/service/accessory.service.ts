import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accessory} from "../model/accessory";
import {environment} from "../../environments/environment";
import {HTTPResponse} from "./knife.service";

@Injectable()
export class AccessoryService{

  constructor(private http:HttpClient) {
  }

  isAccessory(object:Object)
  {
    return 'accessoryName' in object&&
    'price' in object&&
    'description' in object&&
    'imageUrl' in object&&
    'type' in object&&
    'stock' in object&&
    'supplier' in object
  }
  public findAll():Observable<Accessory[]>{
    return this.http.get<Accessory[]>(`${environment.APL_URL}/accessories`);
  }

  public hasCommented(accessoryId:number):Observable<boolean>{
    return this.http.get<boolean>(`${environment.APL_URL}/accessories/comment/hasCommented/${accessoryId}`,{withCredentials:true});
  }

  public findById(id:number):Observable<Accessory>{
    return this.http.get<Accessory>(`${environment.APL_URL}/accessories/${id}`);
  }
  public save(accessory:Accessory):Observable<HTTPResponse>{
    return this.http.post<HTTPResponse>(`${environment.APL_URL}/accessories`, accessory,{withCredentials:true});
  }
  public updateAccessory(accessory:Accessory){
    return this.http.put(`${environment.APL_URL}/accessories`,accessory,{withCredentials:true});
  }
}
