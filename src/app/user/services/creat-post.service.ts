import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../classes/post';

@Injectable({
  providedIn: 'root'
})
export class CreatPostService {

  _url = 'http://localhost:3000/posts';
  constructor(private _http: HttpClient) { }

  sendPost(post: Post) {
    return this._http.post<any>(this._url, post)
  }
}
