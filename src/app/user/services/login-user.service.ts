import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  //readonly url = 'http://backend-tic-enit.herokuapp.com/student/login';
  constructor(private http : HttpClient) { }

  loginUser(user : User){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    return this.http.post('http://backend-tic-enit.herokuapp.com/student/login', user, { headers: reqHeader });
  }
}
