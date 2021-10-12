import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-candidacies',
  templateUrl: './candidacies.component.html',
  styleUrls: ['./candidacies.component.css']
})
export class CandidaciesComponent implements OnInit {

  constructor(private route : ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.getCandidacies();
  }
  
  offer = {};
  candidacies = [];
  user={};
  picture = "../../../assets/img/profil.png";
  public getCandidacies(){
    var id = "";
    this.route.paramMap.subscribe(param => {
      id = param.get('id');
    });
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("companyToken")});
    this.http.get("https://backend-ticenit.herokuapp.com/offers/candidacies?id="+id ,{ headers: reqHeader }).subscribe((data : any) => {
      this.candidacies = data.candidacies;
      this.offer = data;
      console.log(this.offer);
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }
  public getUserInfo(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("companyToken")});
    this.http.get("https://backend-ticenit.herokuapp.com/company/user/"+id ,{ headers: reqHeader }).subscribe((data : any) => {
      this.user = data;
      if(data.picture != ""){
        this.picture = data.picture;
      }
      console.log(this.user);
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  public togglePopup(){
    //this.popup = 'home';
    document.getElementById("popup").classList.toggle("active");
  }

}
