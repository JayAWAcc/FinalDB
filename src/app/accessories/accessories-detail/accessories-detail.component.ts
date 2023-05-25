import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AccessoryService} from "../../../shared/service/accessory.service";
import {Accessory} from "../../../shared/model/accessory";
import {CartService} from "../../../shared/service/cart.service";
import {Comment} from "../../../shared/model/comment";
import {CommentService} from "../../../shared/service/comment.service";
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector:"app-accessories-detail",
  templateUrl:"accessories-detail.component.html",
  styleUrls:["accessories-detail.component.scss"]
})

export class AccessoriesDetailComponent implements OnInit{

  quantity:number=1;

  averageRating:number=NaN;
  comment:Comment|undefined;
  accessory:Accessory|undefined;
  commentError:string|undefined;
  hasCommented:boolean=false;
  hasPurchased:boolean=false;
  reviewDisabled:boolean=false;
  constructor(private ar: ActivatedRoute,
              private as: AccessoryService,
              private cs: CartService,
              private commentService:CommentService,
              private authService:AuthService) {

  }
  comments: Comment[]=[];
  flag:boolean=false;
  accessoryImg:string='';

  @ViewChild('reviewButton')
  reviewButton:ElementRef|undefined;


  checkImg(url:string){

    if(url.indexOf('http')==0){
      return url;
    }
    else{
      return `./assets/accessoryImg/${url}`;
    }

  }
  submitComment(){
    if(this.comment&&this.accessory) {
      console.log(this.comment)
      this.commentService.sendAccessoryComment(this.comment, this.accessory.id).subscribe(
        next=>{
          if(next.success)
          {

            if(this.reviewButton)
              this.reviewButton.nativeElement.disabled=true;


            this.commentError="YOUR REVIEW HAVE BEEN SUBMITTED HAVE A GOOD DAY"
          }
        }
      );
    }
  }

  changeFlag() {


    if (!this.authService.getCurrentLogin()) {
      console.log('hit');
      this.commentError = "PLEASE LOGIN TO LEAVE A REPLY";
    } else if (this.hasPurchased) {

      this.commentError = "YOU HAVE TO MAKE A PURCHASE BEFORE YOU CAN COMMENT";
    } else if (this.hasCommented) {

      this.commentError = "YOU HAVE COMMENTED ON THIS PRODUCT BEFORE";
    } else {
      this.comment = {userid: Number(this.authService.getCurrentLogin()), rating: 0, comments: ''}
    }



      try {
        setTimeout(()=>{this.commentError=''}, 5000);
                }
                catch (e){

                }


  }

  isNaN(number:Number){
    return Number.isNaN(+number)
  }
  addOne(){
    if(this.accessory?.stock&&this.accessory?.stock>this.quantity)
    {
      if(this.quantity<999)
      {
        this.quantity++;
      }
    }



  }
  subOne(){
    if(this.quantity>0)
    {
      this.quantity--;
    }

  }
  addProduct(){
    if(this.accessory)
    {
      this.cs.addAccessory(this.accessory,this.quantity);
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

  ngOnInit() {

    this.as.findById(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(
      accessory=>{this.accessory=accessory;
        this.accessoryImg=this.checkImg(accessory.imageUrl)}
    )

      this.commentService.getAccessoryCommentByAccessoryId(Number(this.ar.snapshot.paramMap.get('id')))
        .subscribe(next=>{this.comments=next;
          console.log(next);
        })
      this.commentService.getAccessoriesAverageRating(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(
        next=>{console.log(next);this.averageRating=next}
      )


      this.as.hasCommented(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(next=> this.hasCommented=next);

      this.commentService.hasPurchasedAccessory(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(next=> this.hasPurchased=next);


  }


}
