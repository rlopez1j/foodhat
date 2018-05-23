import { Component, OnInit, ViewChild, ViewContainerRef,
         ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core'
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

    componentRef: any;
    @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private api:ApiService, private resolver: ComponentFactoryResolver,
     private route: ActivatedRoute, private router: Router){}

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
    // remove "add-hat" button
    this.entry.clear()
    const factory = this.resolver.resolveComponentFactory(HatComponent);
    this.componentRef = this.entry.createComponent(factory)
  }
}
