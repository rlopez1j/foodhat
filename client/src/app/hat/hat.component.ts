import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // might not need this
import * as socketIO from 'socket.io-client';

@Component({
  selector: 'app-hat',
  templateUrl: './hat.component.html',
  styleUrls: ['./hat.component.css']
})
export class HatComponent implements OnInit{

  constructor(private api:ApiService){}

  ngOnInit(){
    const socket = socketIO('http://localhost:3000');
  }

}
