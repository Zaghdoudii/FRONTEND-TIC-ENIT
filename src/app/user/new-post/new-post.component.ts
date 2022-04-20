import { Component, OnInit } from '@angular/core';
import {Post} from '../classes/post';
import { MatDialog } from '@angular/material/dialog';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newpost = new Post('', '', '', '');

  constructor( private dialogRef: MatDialog, private http: HttpClient) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post('http://backend-tic-enit.herokuapp.com/student/posts', this.newpost).subscribe((data: any) => {
          console.log(data);
          this.newpost = {
            topic: '',
            title: '',
            description: '',
            date: '',
            body: '',
            userName: ''
          };
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });

   // this._creatPost.sendPost(this.newpost)
     //   .subscribe(
       //     data => console.log('succes', data),
         //   error => console.log('error: ', error)
       // )
    this.dialogRef.closeAll();
  }

}
