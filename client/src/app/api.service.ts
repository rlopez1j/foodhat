import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService{

  constructor(private http: Http){}

  // create user for application or log them in. Backend API handles which to do
  getProfile(){
  var headers = new Headers()
  return this.http.get('api/crud/profile')
  .map(res => res.json())
  }

  checkUsername(username){
    return this.http.get('api/crud/check-username', {params: {username: username}})
    .map(res => res.json())
  }

  createUsername(username){
    return this.http.post('api/crud/create-username', {username: username})
  }
}
