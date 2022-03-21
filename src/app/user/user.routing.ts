import { Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { MapUserComponent } from './map-user/map-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import {UserPostsComponent} from './user-posts/user-posts.component';



export const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home',               component: HomeUserComponent },
  { path: 'user-posts',               component: UserPostsComponent},
  { path: 'search',             component: SearchUserComponent },
  { path: 'profile',            component: ProfileUserComponent },
  { path: 'documents',          component: DocumentsComponent },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
