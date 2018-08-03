import { Component, OnInit, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../api.service'
import { HatComponent } from '../hat/hat.component'
import { NotificationsService } from '../notifications.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    user = []
    clicked = false

  constructor(private api: ApiService, private route: ActivatedRoute,
    private router: Router, private injector: Injector, private notifications: NotificationsService){
      this.notifications.getPermission(this.user)
      this.notifications.pollToken(this.user)
      this.notifications.receiveNotifications()

       if(document.createElement('app-hat').constructor == HTMLElement){
         const hat = createCustomElement(HatComponent, {injector})
         customElements.define('app-hat', hat)
       }
     }

  ngOnInit(){



    console.log('we out here!')
    if(!this.api.getUserData()){
      this.api.getProfile().subscribe((data: any)=>{
        console.log(data)
        this.api.changeUserData(data)
        this.user = this.api.getUserData()

        this.route.queryParams.subscribe(params=>{
          if(params.room){
            this.startSocket()
          }
        })
      })
    } else{
      this.user = this.api.getUserData()
      console.log('no refresh: ', this.user)
    }
  }

  // connects to socket.io directly through angular
  private startSocket(){
    this.clicked = true // changes the value to true which hides the button. Happy???
    const element = document.createElement('app-hat')
    document.body.appendChild(element)
  }
}
