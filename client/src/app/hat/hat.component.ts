import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { } from '@types/googlemaps'
import * as socketIO from 'socket.io-client'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-hat',
  templateUrl: './hat.component.html',
  styleUrls: ['./hat.component.css']
})
export class HatComponent implements OnInit{
  // variables used for socket.io
  user = null
  room = null
  socket = null
  lobby = []

  // Google Maps API variables
  location = null
  GoogleMaps = null

  // dom binding
  search_term = null
  input_field = null
  constructor(private api:ApiService, private route: ActivatedRoute, private router: Router){}

  joinRoom(room){
    this.socket.emit('room', room)
    this.socket.emit('join', this.user)
  }

  ngOnInit(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      })
    }

    //this.GoogleMaps = new google.maps.places.PlacesService(/* map to dom element */)

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
    // socket.io event handlers
    this.socket.on('user-data', (data)=>{
      console.log(data)
      this.lobby[this.lobby.length] = data
      console.log("new user", this.lobby)
    })

    this.socket.on('choice', (choice)=>{
      console.log(choice)
    })

    this.socket.on('lobby', (lobby)=>{
      this.lobby = lobby
      console.log('lobby:', this.lobby)
    })

    this.socket.on('update-lobby', (new_lobby)=>{
      console.log('lobby from io:', new_lobby)
      this.lobby = new_lobby
      console.log('udpated lobby: ', this.lobby)
    })
  }

  // adds restaurant obj to hat
  private addToHat(restaurant){
    // will add json object
    this.socket.emit('add-to-hat', restaurant)
  }

  private searchGoogle(){
    console.log(this.input_field)
    console.log(this.search_term)
  }
}
