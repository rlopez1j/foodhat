import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-createusername',
  templateUrl: './createusername.component.html',
  styleUrls: ['./createusername.component.css']
})
export class CreateusernameComponent implements OnInit{

  constructor(private api:ApiService){}

  ngOnInit(){
  }

  keyPress(event: any){
    console.log(event.target.value)
    this.api.checkUsername(event.target.value).subscribe((data)=> console.log(data))
  }
}
