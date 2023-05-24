import {AfterContentInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges{

  @Input()
  rating:number=0;
  constructor() { }



  ngOnChanges(changes: SimpleChanges) {
    let star=document.getElementsByTagName('span');

    for(let i=0;i<Math.floor(this.rating);i++)
    {

      star.item(i)!.className="fa fa-star checked";



    }

    for(let i=Math.floor(this.rating);i<star.length;i++)
    {
      star.item(i)!.className="fa fa-star";

    }


  }



  }
