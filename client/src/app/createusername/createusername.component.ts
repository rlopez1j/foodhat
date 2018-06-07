import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-createusername',
  templateUrl: './createusername.component.html',
  styleUrls: ['./createusername.component.css']
})
export class CreateusernameComponent implements OnInit{
  constructor(private api:ApiService){}
  username; // change because it might be confusing
  input; // change because it doesn't reflect what it actually is
  valid = true;
  valid_class = '';
  ngOnInit(){
  }

  // this checks if the username is avaiable
  searchName(username){
    if(!username.errors && (username.dirty || username.touched)){
      console.log(username.model);
      this.api.checkUsername(username.model).subscribe((username: any)=>{
        if(username.avaiable){
          console.log('username available')
          this.valid_class = 'is-valid'
          this.valid = true
        } else{
            console.log('username not available')
            this.valid_class = 'is-invalid'
            this.valid = false
          }
        })
    }
  }

  send(username){
    console.log(username.model)
      this.api.createUsername(username.model).subscribe((success)=>{
        console.log(success)
        if(success){
          window.location.href = '/'
        }
      })
  }
  /* MIGHT DELETE THIS */
  // will do validation here before sending to api in
  keyPress(){
    console.log(this.username)
    // //detect non character strokes
    // if(!(event.keyCode != 8 && event.keyCode < 47 ||
    //    event.keyCode > 90 && event.keyCode < 94 ||
    //    event.keyCode > 105 && event.keyCode < 146) ||
    //    event.key == '_'){
    //      if(/^[a-zA-Z0-9]|_+$/.test(event.key)){
    //        if(event.target.value.length >= 3 && event.target.value.length <= 15 ){
    //          // this checks if the username is avaiable
    //          this.api.checkUsername(event.target.value).subscribe((username)=>{
    //              if(username.avaiable){
    //                console.log('username available')
    //              } else{
    //                console.log('username not available')
    //              }
    //          })
    //        }else{
    //          console.log('username must be between 3 and 15 characters')
    //        }
    //      }else{
    //          console.log('Username can only contain: letters, numbers, and underscores.')
    //        }
    //    }
  }
}
