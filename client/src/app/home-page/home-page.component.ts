import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    user = [];

    public loadExternalJS(){
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = '../assets/js/client.js';
      script.async = true;
      script.defer = true;
      body.appendChild(script);
    }
  constructor(private api:ApiService){}

  ngOnInit(){
    this.loadExternalJS();
    this.api.getProfile().subscribe((data)=>{console.log(data); this.user = data}) // more stuff will be added later
  }

}
