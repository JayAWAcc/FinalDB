import {Component, Input, OnInit} from "@angular/core";
import {Accessory} from "../../../shared/model/accessory";
import {Comment} from "../../../shared/model/comment";
import {CommentService} from "../../../shared/service/comment.service";
import {retry} from "rxjs";

@Component({
  selector: "app-accessories-view",
  templateUrl: "accessories-view.component.html",
  styleUrls: ["accessories-view.component.scss"]
  }
)

export class AccessoriesViewComponent implements OnInit{
    @Input()
    accessory: Accessory|undefined;

  accessoryImage:string='';

  ngOnInit() {
    this.accessoryImage=this.checkImg(String(this.accessory?.imageUrl));
  }

  checkImg(url:string){

    if(url==''||url.toLowerCase()=="nan"){
      return './assets/notFound.png'
    }
    else if(url.indexOf('http')==0){
      return url;
    }
    else{
      return `./assets/accessoryImg/${url}`;
    }

  }


  isInStock(stock:number):String{
      if(stock>0)
      {
          return "In Stock";
      }
      else
      {
        return "OUT OF STOCK!";
      }

    }
}
