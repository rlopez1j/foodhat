import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';

const URI_ROUTES: Routes = [
  {path: 'contact-us', component: ContactComponent, data: {title: 'Contact Us'}},
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about-us', component: AboutComponent, data:{title: 'About Us'}},
  {path: '', component: SignupComponent,  data: {title: 'Food Hat'}},
  {path: '**', component: NotfoundComponent, data: {title: '404: Page Not Found!'}}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(URI_ROUTES, {enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
