import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { CreateInterviewComponent } from './components/create-interview/create-interview.component';
import { PollComponent } from './components/poll/poll.component';
import { InterviewComponent } from './components/interview/interview.component';
import { AccesserrorComponent } from './components/accesserror/accesserror.component';
import { ActivationComponent } from './components/activation/activation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ProfileComponent,
    CreatePollComponent,
    CreateInterviewComponent,
    PollComponent,
    InterviewComponent,
    AccesserrorComponent,
    ActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
