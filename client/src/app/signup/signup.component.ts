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

  signUp(){
    window.location.href = 'http://localhost:3000/api/google/oauth/'
  }
}
