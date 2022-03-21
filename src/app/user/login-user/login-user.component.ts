import {  HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginErrorMessage = '';
  isLoginError = false;
  user = new User('student');
  constructor(private loginUserService: LoginUserService, private router: Router) { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log(this.user);
    document.getElementById('submit-btn').setAttribute('disabled', 'true');
    document.getElementById('submit-btn').setAttribute('style', 'cursor: not-allowed! important;');

    this.loginUserService.loginUser(this.user).subscribe((data: any) => {
      localStorage.setItem('userToken', data.accessToken);
      localStorage.setItem('user_id', data.id);
      localStorage.setItem('name', data.name);
      // window.location.replace('/user/home');
      this.router.navigate(['/user/home']);
   },
   (err: HttpErrorResponse) => {
    document.getElementById('submit-btn').removeAttribute('disabled');
    document.getElementById('submit-btn').setAttribute('style', 'cursor: pointer;');
     this.isLoginError = true;
     this.loginErrorMessage = err.error.message;

   });

 }

}
