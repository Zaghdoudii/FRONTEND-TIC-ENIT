import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterUserService } from '../services/register-user.service';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user = new User('student');
  page = 'register';
  type = 'student';
  date = new Date();
  years = [];
  classes = [
    '1st CS 1',
    '1st CS 2',
    '1st CS 3',
    '2nd CS 1',
    '2nd CS 2',
    '2nd CS 3',
    '3rd CS 1',
    '3rd CS 2',
    '3rd CS 3',
    '1st Tel 1',
    '1st Tel 2',
    '1st Tel 3',
    '2nd Tel 1',
    '2nd Tel 2',
    '2nd Tel 3',
    '3rd Tel 1',
    '3rd Tel 2',
    '3rd Tel 3'
  ];
  constructor(private registerUserService: RegisterUserService) {
    this.page = 'register';
  }

  ngOnInit(): void {
    let i = 0;
    for (i = 2000; i < this.date.getFullYear() + 5; i++) {
      this.years.push(i + '');
    }
  }

  registerUser() {
    this.user.type = this.type;
    document.getElementById('submit-btn').setAttribute('disabled', 'true');
    document.getElementById('submit-btn').setAttribute('style', 'cursor: not-allowed! important;');
    this.registerUserService.registerUser(this.user).subscribe((data: any) => {
      this.page = 'success';
      console.log(data);
   },
   (err: HttpErrorResponse) => {
    document.getElementById('submit-btn').removeAttribute('disabled');
    document.getElementById('submit-btn').setAttribute('style', 'cursor: pointer;');
    this.page = 'error';
     console.log(err);
   });
    console.log(this.user);
  }

}
