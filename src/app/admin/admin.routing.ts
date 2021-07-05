import { Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SearchAdminComponent } from './search-admin/search-admin.component';
import { SendEmailComponent } from './send-email/send-email.component';



export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home',               component: HomeAdminComponent },
  { path: 'send',               component: SendEmailComponent },
  { path: 'search',             component: SearchAdminComponent },
  { path: 'add',                component: AddUsersComponent },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];