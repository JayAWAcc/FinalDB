import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {KnifeService} from "../../../shared/service/knife.service";
import {Knife} from "../../../shared/model/knife";


@Component({
  selector:"app-knife-view",
  templateUrl:"knife-view.html",
  styleUrls:["knife-view.scss"]
})

export class KnifeView implements OnInit{
  @Input()
  knife:Knife|undefined;

  imgUrl:string='';
  ngOnInit() {

    if (this.knife && this.knife.image && this.knife.image[0]) {
      if(this.knife.image[0].image.indexOf('http')==0){
        this.imgUrl=this.knife.image[0].image
      }
      else if(!(this.knife.image[0].image==='NaN'||this.knife.image[0].image==='')){
        this.imgUrl='./assets/knifeImage/'+this.knife.image[0].image;

      }
      else{
        this.imgUrl='NaN';
      }
      }
/*      fetch(this.knife.image[0].image, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            // @ts-ignore
            this.imgUrl = this.knife.image[0].image;
          }
        }).catch(err => console.log('Error:', err));*/

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
