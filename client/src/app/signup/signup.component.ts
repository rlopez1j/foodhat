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

  sign_up(){
    var consent_screen = window.open('http://localhost:3000/api/google/oauth/',
     '_blank', 'left=2500,top=200,height=520,width=520,status=yes,resizable=no');
     

  }
}
