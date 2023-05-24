import {Injectable, OnInit} from "@angular/core";

@Injectable()
export class PageService{


  length=0;
  pageSize=5;
  currentPage=0;
 changePage($event:{previousPageIndex?: number, pageIndex: number, pageSize: number ,length: number}){
  console.log($event);
  this.length=$event.length;
  this.pageSize=$event.pageSize;
  this.currentPage=$event.pageIndex;

  console.log('current page = ' + this.currentPage);
 }

 totalItem(...args: any[])
 {
   this.length=0;

   let ret=0;
    args.forEach(e=>{ret= ret + e.length})
   this.length=ret;
 }
}
