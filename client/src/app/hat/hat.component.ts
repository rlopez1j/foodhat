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
  user = []
  room = null
  constructor(private api:ApiService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.room = this.api.getUserData().username // might obfrustcate room name a bit

    const socket = socketIO('http://localhost:3000');
    this.route.queryParams.subscribe(params=>{ // this is how invitations are going to be handled
      if(!params.room){ // if no room param in url (room dne) creat room
        socket.emit('room', this.room) // joins self-made room
      } else{
        socket.emit('room', params.room) // joins room invited to
      }
    })

    socket.on('message', (data)=>{
      console.log(data)
    })
  }

}
