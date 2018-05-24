import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Food Hat';
  // do no show logout button if user is not logged in
  private logout(){
    window.location.href = "http://localhost:3000/api/google/logout"
  }
}
