import { Component, OnInit, ViewChild, ViewContainerRef,
         ComponentFactoryResolver, ComponentRef, ComponentFactory, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../api.service'
import { HatComponent } from '../hat/hat.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    user = []
    clicked = false

    componentRef: any;
    @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private api:ApiService, private resolver: ComponentFactoryResolver,
     private route: ActivatedRoute, private router: Router, private injector: Injector){
       if(document.createElement('app-hat').constructor == HTMLElement){
         const hat = createCustomElement(HatComponent, {injector})
         customElements.define('app-hat', hat)
       } else{
         this.clicked = true
       }
     }

  ngOnInit(){
    this.user = this.api.getUserData()
    this.route.queryParams.subscribe(params=>{
      if(params.room){
        this.startSocket()
      }
    })
  }

  // connects to socket.io directly through angular
  private startSocket(){
    this.clicked = true // changes the value to true which hides the button. Happy???
    // this.entry.clear()
    // const factory = this.resolver.resolveComponentFactory(HatComponent);
    // this.componentRef = this.entry.createComponent(factory)
    const element = document.createElement('app-hat')
    // // console.log(element)
    document.body.appendChild(element)
  }
}
