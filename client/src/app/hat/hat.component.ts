import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
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
  // this is just used for .PlacesService argument
  @ViewChild('input') dom: ElementRef

  // variables used for socket.io
  user = null
  room = null
  socket = null
  lobby = new Map()

  // Google Maps API variables
  location = null
  GoogleMaps = null
  suggestions = null

  // dom binding
  search_term = null
  html_snippet = null
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

    this.GoogleMaps = new google.maps.places.PlacesService(this.dom.nativeElement)

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
    console.log(this.search_term)
    // sets options for maps search
    var options = {
      location: this.location, // uses the location object we created
      radius: '8046.72', // 5 mi raduis in m
      name: this.search_term,
      type: ['restaurant'] // duh
    }
    var results
    this.GoogleMaps.nearbySearch(options, /*(results = this.callback)=>{
      console.log('results: ', results)
    }*/ this.callback)
  }

  private callback(restaurants, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
      // do stuff
      console.log(restaurants) // for debugging purposes
      var list = Array()
      restaurants.forEach((data, index)=>{
        if(index < 5){
          list.push({
            name: data.name,
            address: data.vicinity,
            rating: data.rating,
            hours: data.opening_hours
          })
        } else{
          return
        }
    })
    console.log('list: ', list)
    return list
  }
}

  private createList(list){
    this.suggestions = list
    console.log(this.suggestions)
  }

  private lobbyVals(): Array<String>{ // *ngFor cant iterate through maps so must convert to array
    return Array.from(this.lobby.values())
  }

  private disconnect(){
    this.socket.emit('disconnect')
    window.location.href='/'
  }

}
