import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject'
//import 'rxjs/add/operator/map';

@Injectable()
export class ApiService{

  private data: any

  constructor(private http: HttpClient){}
  // creates an observable to avoid having to call to api multiple times for user-nfo
  private user = null

  public changeUserData(data){
    this.user = data
  }
  public getUserData(){
    return this.user
  }

  // create user for application or log them in. Backend API handles which to do
  getProfile(){
    return this.data = this.http.get('api/crud/profile')
    //.map(res => res.json())
  }

  checkUsername(username){
    return this.data = this.http.get('api/crud/check-username', {params: {username: username}})
    //.map(res => res.json())
  }

  createUsername(username){
    return this.data = this.http.post('api/crud/create-username', {username: username})
    //.map(res => res.json())
  }

  getHistory(){
    return this.data = this.http.get('api/crud/get-history')
    //.map(res => res.json())
  }

  getFriendsList(){
    return this.data = this.http.get('api/crud/get-friends-list')
    //.map(res => res.json())
  }
}
