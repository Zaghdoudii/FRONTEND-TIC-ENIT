import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileUserComponent } from './profile-user/profile-user.component';

import { IsUserGuard } from './guards/is-user.guard';
import { UserRoutes } from './user.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserComponentsModule } from './user-components/user-components.module';
import { SearchUserComponent } from './search-user/search-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { MapUserComponent } from './map-user/map-user.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { MapAdminComponent } from './map-admin/map-admin.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import {IconsModule, MDBRootModule} from "angular-bootstrap-md";
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        UserComponentsModule,
        ProgressBarModule,
        IconsModule,
        IconsModule,
        MDBRootModule
    ],
    declarations: [
        HomeUserComponent,
        ProfileUserComponent,
        SearchUserComponent,

        MapUserComponent,
        DocumentsComponent,
        MapAdminComponent,
        UserPostsComponent,
        NewPostComponent,
    ],
    providers: [IsUserGuard],
    exports: [
        UserPostsComponent
    ]
})
export class UserModule { }
