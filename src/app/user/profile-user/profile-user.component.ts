import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  readonly url = 'http://pfa2-nodejs.herokuapp.com/student/';
  constructor(private http : HttpClient) { }
  user = new User("student");
  page = "profile";
  picture = "../../../assets/img/profil.png";
  date = new Date();
  years = [];
  classes = [
    "1st CS 1",
    "1st CS 2",
    "1st CS 3",
    "2nd CS 1",
    "2nd CS 2",
    "2nd CS 3",
    "3rd CS 1",
    "3rd CS 2",
    "3rd CS 3",
    "1st Tel 1",
    "1st Tel 2",
    "1st Tel 3",
    "2nd Tel 1",
    "2nd Tel 2",
    "2nd Tel 3",
    "3rd Tel 1",
    "3rd Tel 2",
    "3rd Tel 3"
  ];
  ngOnInit() {
    let i = 0;
    for(i=2000; i<this.date.getFullYear() + 5;i++){
      this.years.push(i+"");
    }
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    this.http.get(this.url+localStorage.getItem("user_id"), { headers: reqHeader }).subscribe((data : any)=>{
      console.log(data);
      this.user.firstname =data.firstname;
      this.user.lastname =data.lastname;
      this.user.email =data.email;
      this.user.country =data.country;
      this.user.city =data.city;
      this.user.address =data.address;
      this.user.workAt =data.workAt;
      this.user.class =data.class;
      this.user.linkedin =data.linkedin;
      this.user.type =data.type;
      this.user.phone =data.phone;
      this.user.aboutme =data.aboutme;
      this.user.promotion =data.promotion;
      if(data.picture != undefined && data.picture != ""){
        this.picture = data.picture;
      }
      
   },
   (err : HttpErrorResponse)=>{
     
   });
    
  }

  updateProfile(){
    console.log(this.user);
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    this.http.patch("https://backend-ticenit.herokuapp.com/student/"+localStorage.getItem("user_id"),this.user, { headers: reqHeader }).subscribe((data : any)=>{
      console.log(data);
      
      this.page = "profile";
   },
   (err : HttpErrorResponse)=>{
    console.log(err);
    this.page = "profile";
   });
  }

  cancel(){
    this.page = "profile";
  }

}
