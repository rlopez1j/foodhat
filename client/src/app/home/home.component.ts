import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user = []; // this will come from a db object

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
    this.api.getProfile().subscribe((data) => this.user = data)

  }


}
