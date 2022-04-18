import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";

import { User } from "../models/user.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {

  readonly url = "http://localhost:3000/student/";

  constructor(private http: HttpClient) {}

  

  

  updatePicture(name :string ,image: File ) {
    const profileData = new FormData();
    profileData.append("name",name);
    profileData.append("image", image, name);
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    return this.http.patch('http://localhost:3000/student/upload/' + localStorage.getItem("user_id"), profileData, { headers: reqHeader });
  }
}