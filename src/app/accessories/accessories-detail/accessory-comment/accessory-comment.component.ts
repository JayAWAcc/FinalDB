import {Comment} from "../../../../shared/model/comment";
import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/service/auth.service";


@Component({
  selector: 'app-accessory-comment',
  templateUrl: './accessory-comment.component.html',
  styleUrls: ['./accessory-comment.component.scss']
})
export class AccessoryCommentComponent implements OnInit {

  @Input()
  comment:Comment|undefined;

  userName:string='Anonymous';
  constructor(private as:AuthService) { }


  ngOnInit(): void {

    this.as.getUsernameById(Number(this.comment?.userid)).subscribe(
      {next:next=>
        {
        console.log(next);
        //this.userName=next;
        },
        error:(error)=>{console.log(error);this.userName=error.error.text}}
    )

  }

  spanSet(max:number){
    let ret=[];
    for (let i=0;i<max;i++)
    {
      ret.push('1');
    }
    return ret;
  }


}
