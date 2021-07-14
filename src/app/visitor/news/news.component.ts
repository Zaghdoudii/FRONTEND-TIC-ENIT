import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }
  page = "send";
  message = {
    name : "",
    email : "",
    message : "",
    date : "",
    lu : false
  };
  erreur1 = false;
  public popup = 'home';
  public togglePopup(){
    this.popup = 'home';
    document.getElementById("popup-1").classList.toggle("active");
  }
  public createUserAccount(){
    this.popup = 'createUserAccount';
  }
  public createCompanyAccount(){
    this.popup = 'createCompanyAccount';
  }
  public loginCompany(){
    this.popup = 'loginCompany';
  }
  sendEmail(){
    if(this.message.name == "" || this.message.email == "" || this.message.message == "" ){
      this.erreur1 = true;
    }else{
      var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        this.message.date = day + "/" + month + "/" + year;
      
      this.http.post("https://backend-ticenit.herokuapp.com/admin/message", this.message ).subscribe((data : any)=>{
        console.log(data);
        this.message = {
          name : "",
          email : "",
          message : "",
          date : "",
          lu : false
        };
        this.page = "success";
     },
     (err : HttpErrorResponse)=>{
      console.log(err);
     });  
    }

  }
}
