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
    //detect non character strokes
    // will do validation here before sending to api in

    // this checks if the username is avaiable
    this.api.checkUsername(event.target.value).subscribe((username)=>
        if(username.exists == true){
          console.log('username not available')
        } else{
          console.log('username available')
        }
    )
  }
}
