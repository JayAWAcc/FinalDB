import {Component, ElementRef, ViewChild} from "@angular/core";
import {KnifeService} from "../../shared/service/knife.service";
import {Knife} from "../../shared/model/knife";
import {Accessory} from "../../shared/model/accessory";
import {AccessoryService} from "../../shared/service/accessory.service";


@Component({
  selector:"app-add-product",
  templateUrl: "add-product.component.html",
  styleUrls: ["add-product.component.scss"]
})

export class AddProductComponent{

  imageUrl:string|undefined;
  accessoryType:string|undefined;
  knife:Knife={ image:[], brand:"", description:"", name:"", price:0, steel:"", stock:0, knifeType:"",supplier:""}
  constructor( private ks:KnifeService,
               private as: AccessoryService) {
  }

  knifeNotValid:boolean=false;
  accessoryNotValid:boolean=false;
  knifeValid:boolean=false;
  accessoryValid:boolean=false;
  accessory:Accessory={id:0,accessoryName:"", price:0, description:"", imageUrl:"",
    type:[], stock:0, supplier:""}


  addTypeInput(){
    let element=document.getElementById('type');
    if(element)
    {
      let child=document.createElement("input");
      child.type='text';
      element.appendChild(child)
    }
  }
/*  @ViewChild('image')
  image:ElementRef|undefined;*/
  addImageInput(){
    let element=document.getElementById('image');
    if(element)
    {
      let child=document.createElement("input");
      child.type='text';
      element.appendChild(child)
    }


  }
  saveKnife(){

    let elements=document.getElementById('image')!.getElementsByTagName('input');
    for(let i=0;i<elements.length;i++)
    {
      this.knife.image?.push(Object(elements.item(i)).value);

    }
    if(this.knife.name)
    {
      this.knife.name=this.knife.name.toLowerCase();
      this.knife.name=this.knife.name[0].toUpperCase()+this.knife.name.substring(1);
    }

    if(this.imageUrl!=undefined)
    {
      this.knife.image=[{id:0,image:this.imageUrl}];
    }
    this.ks.save(this.knife).subscribe({next:()=>{
        this.knifeValid=true;
        for(let i=0;i<elements.length;i++)
        {
          Object(elements.item(i)).value='';

        }
        this.knife={ image:[], brand:"", description:"", name:"", price:0, steel:"", stock:0, knifeType:"",supplier:""}

        setTimeout(()=>{this.knifeValid=false},5000);

      },
    error:()=>{
      this.knifeNotValid=true;
      for(let i=0;i<elements.length;i++)
      {
        Object(elements.item(i)).value='';

      }
      this.knife={ image:[], brand:"", description:"", name:"", price:0, steel:"", stock:0, knifeType:"",supplier:""}


      setTimeout(()=>{this.knifeNotValid=false},5000);

    }});
  }

  saveAccessory(){
    let elements=document.getElementById('type')!.getElementsByTagName('input');
    if(this.accessoryType!=undefined)
    {


      for(let i=0;i<elements.length;i++)
      {
        let temp=Object(elements.item(i)).value.toLowerCase();
        temp=temp[0].toUpperCase()+temp.substring(1)
        this.accessory.type.push({id:0 ,type:{id:0, type:temp}});

      }
    }
    this.accessory.accessoryName=this.accessory.accessoryName.toLowerCase();
    this.accessory.accessoryName[0].toUpperCase();

    console.log(this.accessory)
    this.as.save(this.accessory).subscribe({next:()=>{

        this.accessory={id:0,accessoryName:"", price:0, description:"", imageUrl:"",
          type:[], stock:0, supplier:""}

        this.accessoryValid=true;
        for(let i=0;i<elements.length;i++)
        {
          Object(elements.item(i)).value='';
        }
        setTimeout(()=>{this.accessoryValid=false},5000);

      }
    ,error:()=>{this.accessoryNotValid=true;
        this.accessory={id:0,accessoryName:"", price:0, description:"", imageUrl:"",
          type:[], stock:0, supplier:""}

        for(let i=0;i<elements.length;i++)
        {
          Object(elements.item(i)).value='';
        }
      setTimeout(()=>{this.accessoryNotValid=false},5000);
    }
    })
  }
}
