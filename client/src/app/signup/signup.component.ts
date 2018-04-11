import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(private api:ApiService){ }

  ngOnInit(){
  }

  sign_up(/* this might have params later */){
    this.api.addUser('user').subscribe((data) => console.log(data));
  }
}
