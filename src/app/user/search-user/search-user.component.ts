import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from 'app/company/models/company.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {


  users: any;
  companies : any;
  property = "";
  key: string;
  entity = "";
  mode = "table";
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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.users = []; // to prevent ngFor to throw while we wait for API to return data
    this.companies = [];
    let i = 0;
    for(i=2000; i<this.date.getFullYear() + 5;i++){
      this.years.push(i+"");
    }
  }
  
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

public togglePopupLoading(){
  document.getElementById("popup-99").classList.toggle("active");
}
noResult = false;
  search(){
    this.togglePopupLoading();
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    this.http.get("https://backend-ticenit.herokuapp.com/"+ this.entity +"/search?property="+this.property+"&key="+this.key, { headers: reqHeader }).subscribe((data : any)=>{
    //this.http.get("https://backend-ticenit.herokuapp.com/student/location?property=firstname&key=dabbabi", { headers: reqHeader }).subscribe((data : any)=>{
      console.log(data);
      this.togglePopupLoading();
      if(this.entity == "student"){
        this.users = data;
        if(this.users.length == 0){
          this.noResult = true;
        }else{
          this.noResult = false;
        }
      }else{
        this.companies = data;
        if(this.companies.length == 0){
          this.noResult = true;
        }else{
          this.noResult = false;
        }
      }
   },
   (err : HttpErrorResponse)=>{
    console.log(err);
    this.togglePopupLoading();
    if(this.entity == "student"){
      this.users = [];
      this.noResult = true;
    }else{
      this.companies = [];
      this.noResult = true;
    }
   });

  }
  getAll(){
    this.togglePopupLoading();
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    var entite = "";
    if(this.entity == "student"){
      entite = "all";
    }else if(this.entity == "company"){
      entite = "companies";
    }
    this.http.get("https://backend-ticenit.herokuapp.com/student/" + entite , { headers: reqHeader }).subscribe((data : any)=>{
      console.log(data);
      this.togglePopupLoading();
      if(this.entity == "student"){
        this.users = data;
      }else if(this.entity == "company"){
        this.companies = data;
      }
      
   },
   (err : HttpErrorResponse)=>{
    console.log(err);
    this.togglePopupLoading();
   });
  }

  addresses = [];
  changeMode(){
    if(this.mode == "table"){
      this.mode = "map";
      
      this.addresses = [];
      this.users.forEach(element => {
        this.addresses.push(element.email);
      });
      localStorage.setItem("addresses",JSON.stringify(this.addresses));
      localStorage.setItem("entity",this.entity );
    }else{
      this.mode = "table";
    }
  }
  public togglePopupUser(){
    //this.popup = 'home';
    document.getElementById("popup-1").classList.toggle("active");
  }
  user = new User("student");
  picture = "../../../assets/img/profil.png";
  viewProfileUser(data : any){
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
    this.user.promotion = data.promotion;
    if(data.picture != undefined && data.picture != ""){
      this.picture = data.picture;
    }
    this.togglePopupUser();

  }
  
  company = new Company();
  logo = "./assets/img/companyprofil.png";
  public togglePopupCompany(){
    //this.popup = 'home';
    document.getElementById("popup-2").classList.toggle("active");
  }
  viewProfileCompany(data : any){
    this.company.name =data.name;
      this.company.email =data.email;
      this.company.country =data.country;
      this.company.city =data.city;
      this.company.address =data.address;
      this.company.website =data.website;
      this.company.phone =data.phone;
      this.company.about =data.about;
      if(data.logo != undefined && data.logo != ""){
        this.logo = data.logo;
      }
    this.togglePopupCompany();
  }

}
