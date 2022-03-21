import { Component, OnInit } from '@angular/core';
import {Post} from '../classes/post';
import {CreatPostService} from '../services/creat-post.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newpost = new Post('topic', 'title', 'description', 'body');

  constructor(private _creatPost: CreatPostService, private dialogRef: MatDialog) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this._creatPost.sendPost(this.newpost)
        .subscribe(
            data => console.log('succes', data),
            error => console.log('error: ', error)
        )
    this.dialogRef.closeAll()
  }

}
