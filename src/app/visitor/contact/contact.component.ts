import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  page = "send";
  message = {
    name: "",
    email: "",
    message: "",
    date: "",
    lu: false
  };
  erreur1 = false;

  sendEmail() {
    if (this.message.name == "" || this.message.email == "" || this.message.message == "") {
      this.erreur1 = true;
    } else {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      this.message.date = day + "/" + month + "/" + year;

      this.http.post("http://localhost:3000/admin/message", this.message).subscribe((data: any) => {
        console.log(data);
        this.message = {
          name: "",
          email: "",
          message: "",
          date: "",
          lu: false
        };
        this.page = "success";
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
    }

  }

}
