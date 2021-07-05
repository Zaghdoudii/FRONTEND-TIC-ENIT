import { Routes } from '@angular/router';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { SearchCompanyComponent } from './search-company/search-company.component';



export const CompanyRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home',               component: HomeCompanyComponent },
  { path: 'profile',            component: ProfileCompanyComponent },
  //{ path: 'search',             component: SearchCompanyComponent },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];