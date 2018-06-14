import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ApiService } from './api.service';
import { CreateusernameComponent } from './createusername/createusername.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HatComponent } from './hat/hat.component';

const URI_ROUTES: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {path: 'home', component: HomePageComponent, data: {title: 'Home'}},
  {path: 'contact-us', component: ContactComponent, data: {title: 'Contact Us'}},
  {path: 'about-us', component: AboutComponent, data:{title: 'About Us'}},
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
    HomePageComponent,
    HatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(URI_ROUTES, {enableTracing: false}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [ApiService],
  entryComponents: [HatComponent, CreateusernameComponent, SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
