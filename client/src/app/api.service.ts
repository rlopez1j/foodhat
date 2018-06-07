import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService{
  constructor(private http: HttpClient){}
  // creates an observable to avoid having to call to api multiple times for user-nfo
  private user = null
  // used for components
  public changeUserData(data){ this.user = data }
  public getUserData(){ return this.user }

  // create user for application or log them in. Backend API handles which to do
  getProfile(){ return this.http.get('api/crud/profile') }
  // checks if username is available based on user input
  checkUsername(username){ return this.http.get('api/crud/check-username', {params: {username: username}}) }
  // the post request that adds the given username to the db
  createUsername(username){ return this.http.post('api/crud/create-username', {username: username}) }
  // gets hat history from db
  getHistory(){ return this.http.get('api/crud/get-history') }
  // gets the friend list from the db
  getFriendsList(){ return this.http.get('api/crud/get-friends-list') }
}
