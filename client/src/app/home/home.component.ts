import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  user = 'temp'; // this will come from a db object

=======
  user = 'temp';
  
>>>>>>> cfe611fae555db3150f40e73f884460819d1fd4a
  constructor() { }

  ngOnInit() {
  }

}
