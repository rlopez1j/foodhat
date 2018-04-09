import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  // create user for application or log them in. Backend API handles which to do
  add_user(user){
    var headers = new Headers()
    //headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/google/oauth/', 'user');
      //.map(res => res.json());
  }
}
