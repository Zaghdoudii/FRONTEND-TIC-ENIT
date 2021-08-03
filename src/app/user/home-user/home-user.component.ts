import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOffers();
  }
  offers1 = [];
  offers = [];
  companiesId = [];
  companiesInfo = [];
  getOffers(){
    
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    this.http.get("https://backend-ticenit.herokuapp.com/offers" ,{ headers: reqHeader }).subscribe((data : any) => {
      console.log(data);  
      this.offers1 = data;
      this.getCompaniesInfo();
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  getCompaniesInfo(){
    this.offers1.forEach(elt => {
      this.companiesId.push(elt.companyid);
    });
    console.log(this.companiesId);
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken")});
    this.http.post("https://backend-ticenit.herokuapp.com/student/companiesinfo" ,{ companies : this.companiesId},{ headers: reqHeader }).subscribe((data : any) => {
      this.companiesInfo = data;
      this.offers = this.offers1;
      console.log(data);
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

}
