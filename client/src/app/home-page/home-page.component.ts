import { Component, OnInit, ViewChild, ViewContainerRef,
         ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { ApiService } from '../api.service';
import { HatComponent } from '../hat/hat.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    user = []

    componentRef: any;
    @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private api:ApiService, private resolver: ComponentFactoryResolver){}
  ngOnInit(){
    //this.api.getProfile().subscribe((data)=>{console.log(data); this.user = data}) // more stuff will be added later
    this.user = this.api.getUserData()
  }

  // connects to socket.io directly through angular
  private startSocket(){
    // remove "add-hat" button
    this.entry.clear()
    const factory = this.resolver.resolveComponentFactory(HatComponent);
    this.componentRef = this.entry.createComponent(factory)
  }
}
