import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service'; // might not need this
import * as socketIO from 'socket.io-client';

@Component({
  selector: 'app-hat',
  templateUrl: './hat.component.html',
  styleUrls: ['./hat.component.css']
})
export class HatComponent implements OnInit{
  user = []
  room = null
  constructor(private api:ApiService){}

  ngOnInit(){
    //console.log(user)
    this.user = this.api.getUserData()
    this.room = this.user.username
    const socket = socketIO('http://localhost:3000');
    socket.emit('room', this.room) // adds user in room need more logic when in invited hat

    socket.on('message', (data)=>{
      console.log(data)
    })
  }

}
