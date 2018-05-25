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
  lobby = new Map()

  // Google Maps API variables
  location = null
  GoogleMaps = null

  // dom binding
  search_term = null
  input_field = null
  constructor(private api:ApiService, private route: ActivatedRoute, private router: Router){}

  private joinRoom(room){ // helper function
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

    this.socket = socketIO('http://localhost:3000')
    this.route.queryParams.subscribe(params=>{ // this is how invitations are going to be handled
      if(!params.room){ // if no room param in url (room dne) creat room
        this.joinRoom(this.room)
      } else{
        this.joinRoom(params.room) // joins room in the given query param
      }
    })
    // socket.io event handlers
    this.socket.on('user-data', (data, index)=>{ // get triggered when any users enter
      this.lobby.set(index, data) // adds the user in the lobby<Map>
      console.log("new user: ", this.lobby)
    })

    this.socket.on('choice', (choice)=>{ // gets choice from any given user
      console.log(choice)
    })

    this.socket.on('lobby', (lobby)=>{ // only gets triggered once when the this.user enters
      this.lobby = new Map(lobby) // have to reconvert to Map()
    })

    this.socket.on('update-lobby', (new_lobby)=>{
      this.lobby = new Map(new_lobby) // have to reconvert to Map()
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

  private lobbyVals(): Array<String>{ // *ngFor cant iterate through maps so must convert to array
    return Array.from(this.lobby.values())
  }

}
