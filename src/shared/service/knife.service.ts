import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Knife} from "../model/knife";
import {environment} from "../../environments/environment";
import {UserResponse} from "../model/user-response";

@Injectable()
export class KnifeService{
  constructor(private http:HttpClient) {
  }

  isKnife(object:Object){
    return 'brand' in object &&
    'knifeType'in object &&
    'steel' in object &&
    'stock'in object &&
   'name:'in object &&
    'price'in object &&
    'description'in object &&
    'supplier'in object;

  }
  public findAll():Observable<Knife[]>{

    return this.http.get<Knife[]>(`${environment.APL_URL}/knives`,{withCredentials:true});
  }


  public updateKnife(knife:Knife){
    return this.http.put<Object>( `${environment.APL_URL}/knives`,knife,{withCredentials:true});
  }
  public hasCommented(knifeId:number):Observable<boolean>{
    return this.http.get<boolean>(`${environment.APL_URL}/knives/comment/hasCommented/${knifeId}`,
      {withCredentials:true});
  }

  public findKnifeById(id:number):Observable<Knife>
  {
    return this.http.get<Knife>( `${environment.APL_URL}/knives/${id}`);
  }
  public findKnifeByBrand(brand:string):Observable<Knife[]>{

    return this.http.get<Knife[]>(`${environment.APL_URL}/knives/brand/${brand}`);
  }

  public findKnifeByType(type:string):Observable<Knife[]>{
    return this.http.get<Knife[]>(`${environment.APL_URL}/knives/knifetype/${type}`);
  }
  public findKnifeBySteel(steel:string):Observable<Knife[]>{
    return this.http.get<Knife[]>(`${environment.APL_URL}/knives/steel/${steel}`);
  }
  public findKnifeBySupplier(supplier:string):Observable<Knife[]>{
    return this.http.get<Knife[]>(`${environment.APL_URL}/knives/supplier/${supplier}`);
  }
  public save(knife:Knife):Observable<HTTPResponse>{
    return this.http.post<HTTPResponse>(`${environment.APL_URL}/knives`, knife,{withCredentials:true});
  }
}

export interface HTTPResponse{
  status:number;
  ok:boolean;
}
