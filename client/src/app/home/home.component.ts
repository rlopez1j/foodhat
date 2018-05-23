import { Component, OnInit, ViewChild, ViewContainerRef,
         ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core'
import { CreateusernameComponent } from '../createusername/createusername.component'
import { HomePageComponent } from '../home-page/home-page.component'
import { SignupComponent } from '../signup/signup.component'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  componentRef: any;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private api:ApiService, private resolver: ComponentFactoryResolver){}
  ngOnInit(){
    this.entry.clear();
    this.api.getProfile().subscribe((data)=>{
      console.log(data)
      if(data.signedOut){
        const factory = this.resolver.resolveComponentFactory(SignupComponent)
        this.componentRef = this.entry.createComponent(factory)
      } else{
        if(data.username == null){
          const factory = this.resolver.resolveComponentFactory(CreateusernameComponent)
          this.componentRef = this.entry.createComponent(factory)
        } else{
          this.api.changeUserData(data)
          const factory = this.resolver.resolveComponentFactory(HomePageComponent)
          this.componentRef = this.entry.createComponent(factory)
        }
      }
    })
  }


}
