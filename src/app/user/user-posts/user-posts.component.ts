import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NewPostComponent} from '../new-post/new-post.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

 posts = [];
  constructor(private dialogRef: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPosts();
  }
  openDialog() {
    this.dialogRef.open(NewPostComponent);
    }

  getPosts() {
    this.http.get('http://backend-tic-enit.herokuapp.com/student/posts').subscribe((data: any) => {
          this.posts = data;
          console.log(this.posts);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
}
