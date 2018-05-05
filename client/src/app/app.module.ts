import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpModule, Http} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {ApiService} from './api.service';
import { CreateusernameComponent } from './createusername/createusername.component';
import { HomePageComponent } from './home-page/home-page.component';

const URI_ROUTES: Routes = [ // will need to modify routing once sessions are implemented
  {path: 'contact-us', component: ContactComponent, data: {title: 'Contact Us'}},
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about-us', component: AboutComponent, data:{title: 'About Us'}},
  {path: 'signup', component: SignupComponent,  data: {title: 'Food Hat'}},
  {path: '', component: CreateusernameComponent, data: {title: 'Create Username'}},
  {path: '', component: HomePageComponent, data: {title: 'Home'}},
  {path: '**', component: NotfoundComponent, data: {title: '404: Page Not Found!'}}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    NotfoundComponent,
    CreateusernameComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(URI_ROUTES, {enableTracing: false}),
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
