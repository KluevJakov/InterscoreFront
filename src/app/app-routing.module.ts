import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInterviewComponent } from './components/create-interview/create-interview.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'createInterview', component: CreateInterviewComponent},
  {path: 'createPoll', component: CreatePollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
