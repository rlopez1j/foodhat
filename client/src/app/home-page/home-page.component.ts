import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as socketIO from 'socket.io-client';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    user = [];

  constructor(private api:ApiService){}
  ngOnInit(){
    this.api.getProfile().subscribe((data)=>{console.log(data); this.user = data}) // more stuff will be added later
  }

  // connects to socket.io directly through angular
  private startSocket(){
    const socket = socketIO('http://localhost:3000');
  }
}
