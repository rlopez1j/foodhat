import { Component } from '@angular/core';
import { ContactComponent } from './contact/contact.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Food Hat';
}
