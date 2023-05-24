import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../../shared/model/comment";
import {AuthService} from "../../../../shared/service/auth.service";

@Component({
  selector: 'app-knife-comment',
  templateUrl: './knife-comment.component.html',
  styleUrls: ['./knife-comment.component.scss']
})
export class KnifeCommentComponent implements OnInit {

  @Input()
  comment:Comment|undefined;

  username:string='Anonymous'
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getUsernameById(Number(this.comment?.userid)).subscribe(
      {
        next:(next)=>{console.log(next);this.username=next.toString()},
        error:(err)=>{console.log(err); this.username=err.error.text }
      }
    )
  }

  spanSet(max:number){
    let ret=[];
    for (let i=0;i<Math.floor(max);i++)
    {
      ret.push('1');
    }
    return ret;
  }

}
