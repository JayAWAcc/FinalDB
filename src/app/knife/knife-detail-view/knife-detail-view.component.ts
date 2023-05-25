import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Knife} from "../../../shared/model/knife";
import {ActivatedRoute, Router} from "@angular/router";
import {KnifeService} from "../../../shared/service/knife.service";
import {CartService} from "../../../shared/service/cart.service";
import {combineAll} from "rxjs";
import {Comment} from "../../../shared/model/comment";
import {CommentService} from "../../../shared/service/comment.service";
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector:"app-knife-detail-view",
  templateUrl:"knife-detail-view.component.html",
  styleUrls:["knife-detail-view.component.scss"]
})

export class KnifeDetailViewComponent implements OnInit{

  comments:Comment[]|undefined;
  comment:Comment|undefined;
  quantity:number=1;
  knifeId: number=-1;
  averageRating:number=NaN;
  commentError:string|undefined;
  hasCommented:boolean=false;
  hasPurchased:boolean=false;
/*
  reviewDisabled:boolean=false;
*/

  knife: Knife | undefined;

  currentImg:string|undefined;
  imgUrl:string='';

  @ViewChild('reviewButton')
  reviewButton:ElementRef|undefined;

  constructor(private ar: ActivatedRoute,
              private ks: KnifeService,
              private cs:CartService,
              private commentService:CommentService,
              private authService:AuthService,
              private router:Router) {

  }
  checkImg(url:string){

      if(url.indexOf('http')==0){
        return url;
      }
      else{
        return `./assets/knifeImage/${url}`;
      }

  }
  isNaN(number:Number){
    return Number.isNaN(+number);
  }

  submitComment(){
    if(this.comment&&this.knife) {
      this.commentService.sendKnifeComment(this.comment, this.knifeId).subscribe(next=>{
        if(next.success)
        {

          if(this.reviewButton)
          this.reviewButton.nativeElement.disabled=true;


          this.commentError="YOUR REVIEW HAVE BEEN SUBMITTED HAVE A GOOD DAY"
        }
        else {
          this.commentError="THERE'S AN ERROR WITH YOUR REQUEST PLEASE TRY AGAIN LATER"
        }
      })

    }
  }
  changeFlag(){
    if (!this.authService.getCurrentLogin()) {

      console.log('hit');

      this.commentError = "PLEASE LOGIN TO LEAVE A REPLY";
    }
    else if(!this.hasPurchased) {

      this.commentError="PLEASE MAKE A PURCHASE BEFORE YOU COMMENT";
    }
    else if(this.hasCommented)
    {

      this.commentError = "YOU HAVE COMMENTED ON THIS PRODUCT BEFORE";
    }
    else {
      this.comment={userid:Number(this.authService.getCurrentLogin()),rating:0,comments:''}

    }

    try {
      setTimeout(()=>{this.commentError=''}, 5000);
    }
    catch (e){

    }
  }






  addOne(){
    if(this.knife&&this.knife.stock>this.quantity) {
      if (this.quantity < 999) {
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

  onChange(newValue:number)
  {
    console.log(newValue)

    if(this.knife&&newValue>this.knife.stock)
    {
      this.quantity=this.knife.stock;
    }
  }
  addProduct(){
    if(this.knife)
    {
      this.cs.addKnife(this.knife,this.quantity);
    }

  }
  ngOnInit() {
    this.knifeId = Number(this.ar.snapshot.paramMap.get('id'));
    this.ks.findKnifeById(this.knifeId).subscribe(
      knife => {
        this.knife = knife;
        // @ts-ignore

        if(knife.stock===0)
        {
          this.quantity=0;
        }
        if (knife && knife.image&&knife.image[0] && knife.image[0].image) {

          this.currentImg = knife.image[0].image;
        }
        else
        {
          this.currentImg="notFound.png"
        }

        this.imgUrl=this.checkImg(this.currentImg)
        console.log(this.imgUrl);
      }
    )
    this.commentService.getKnifeCommentByAccessoryId(this.knifeId).subscribe(
      next=>this.comments=next
    );

    this.commentService.getKnifeAverageRating(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(

      next=>{console.log(next);this.averageRating=next;}
    );


      this.ks.hasCommented(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(next=> this.hasCommented=next);

      this.commentService.hasPurchasedKnife(Number(this.ar.snapshot.paramMap.get('id'))).subscribe(next=>{console.log(next); this.hasPurchased=next;});




    /*
    if (this.knife && this.knife.image && this.knife.image[0].image) {
      const img = new Image();
      img.src = this.knife.image[0].image;

      if (img.complete) {
        this.imgUrl = this.knife.image[0].image;
      } else {
        img.onload = () => {
        }

        img.onerror = () => {
          this.imgUrl = '';
        };
      }
      console.log(this.ar.snapshot.paramMap.get('id'));

    }*/
  }

  changeSrc(imgUrl:string)
  {
    this.currentImg=imgUrl;
    this.imgUrl=this.checkImg(imgUrl);
    console.log(imgUrl)
  }
  isInStock(stock: number): String {
    if (stock > 0) {

      return "In Stock";
    } else {

      return "OUT OF STOCK!";
    }

  }
}
