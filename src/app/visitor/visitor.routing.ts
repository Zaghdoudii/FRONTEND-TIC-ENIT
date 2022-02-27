import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';

export const VisitorRoutes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  { path: 'news', component: NewsComponent },
  { path: 'statistics', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: '**',
    redirectTo: 'news',
    pathMatch: 'full',
  }
];