import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin.model';


@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

   //readonly url = 'http://backend-tic-enit.herokuapp.com/admin';
   constructor(private http : HttpClient) { }
   loginUser(admin : Admin){
     var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
     return this.http.post('http://backend-tic-enit.herokuapp.com/admin', admin, { headers: reqHeader });
   }
}







