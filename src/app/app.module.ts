import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import * as firebase from "firebase";

import { DiscService } from "./services/disc.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { CdListComponent } from './cd-list/cd-list.component';
import { NewCdComponent } from './new-cd/new-cd.component';
import { CdDetailsComponent } from './cd-details/cd-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DiscComponent } from './disc/disc.component';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes : Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: HomeComponent},
  { path: "list", canActivate: [AuthGuard], component: CdListComponent},
  { path: "new-disc", canActivate: [AuthGuard], component: NewCdComponent},
  { path: "disc/:id", canActivate: [AuthGuard], component: CdDetailsComponent},
  { path: "auth", component: AuthComponent},
  { path: "new-user", component: NewUserComponent},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    CdListComponent,
    NewCdComponent,
    CdDetailsComponent,
    PageNotFoundComponent,
    HomeComponent,
    DiscComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DiscService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    const config = {
      apiKey: "AIzaSyAsr_WB99_VEwFHEEUOCNpJpPeO-L8Fr4M",
      authDomain: "projet-ocl.firebaseapp.com",
      databaseURL: "https://projet-ocl.firebaseio.com",
      projectId: "projet-ocl",
      storageBucket: "projet-ocl.appspot.com",
      messagingSenderId: "647448916326"
    };
    firebase.initializeApp(config);
  }
 }
