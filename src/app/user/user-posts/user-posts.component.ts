import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NewPostComponent} from '../new-post/new-post.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialogRef.open(NewPostComponent);
    }

}
