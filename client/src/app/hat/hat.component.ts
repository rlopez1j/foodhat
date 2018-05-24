import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import * as socketIO from 'socket.io-client'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-hat',
  templateUrl: './hat.component.html',
  styleUrls: ['./hat.component.css']
})
export class HatComponent implements OnInit{
  user = null
  room = null
  socket = null
//  restaurant_choice = null
  constructor(private api:ApiService, private route: ActivatedRoute, private router: Router){}

  joinRoom(room){
    this.socket.emit('room', room)
    this.socket.emit('join', this.user)
  }

  ngOnInit(){
    this.user = this.api.getUserData()
    this.room = this.user.username // might obfrustcate room name a bit

    this.socket = socketIO('http://localhost:3000');
    this.route.queryParams.subscribe(params=>{ // this is how invitations are going to be handled
      if(!params.room){ // if no room param in url (room dne) creat room
        this.joinRoom(this.room)
      } else{
        this.joinRoom(params.room)
      }
    })
    this.socket.on('user-data', (data)=>{
      console.log(data)
    })

    this.socket.on('choice', (choice)=>{
      console.log(choice)
    })

    this.socket.on('lobby', (lobby)=>{
      console.log('lobby:', lobby)
    })
  }

  private addToHat(restaurant){
    this.socket.emit('add-to-hat', restaurant)
  }
}
