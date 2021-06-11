import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import {environment} from '../../environments/environment';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Category } from '../models/category';
import { Interview } from '../models/interview';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) { }

  /* сервисы интервью */
  createInterview(poll: Poll): Observable<any> {
    return this.http.post<any>(API_URL + '/createInterview', poll);
  }

  answerInterview(poll: Poll): Observable<any> {
    return this.http.post<any>(API_URL + '/answerInterview', poll);
  }

  getMyInterviewsUser(id: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(API_URL + '/getMyInterviewsUser/'+id);
  }

  getMyInterviews(id: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(API_URL + '/getMyInterviews/'+id);
  }

  interviewPage(id: number): Observable<Interview> {
    return this.http.get<Interview>(API_URL + '/interview/' + id);
  }

  /* сервисы категорий */
  categoryCreate(cat: Category): Observable<any> {
    return this.http.post<any>(API_URL + '/categoryCreate', cat);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/getAllCategories');
  }

  /* сервисы опросов */
  getMyPollsUser(id: number): Observable<Poll[]> {
    return this.http.get<Poll[]>(API_URL + '/getMyPollsUser/'+id);
  }

  getMyPolls(id: number): Observable<Poll[]> {
    return this.http.get<Poll[]>(API_URL + '/getMyPolls/'+id);
  }

  pollPage(id: number): Observable<Poll> {
    return this.http.get<Poll>(API_URL + '/poll/' + id);
  }

  createPoll(poll: Poll): Observable<any> {
    return this.http.post<any>(API_URL + '/pollCreate', poll);
  }

  answerPoll(poll: Poll): Observable<any> {
    return this.http.post<any>(API_URL + '/answerPoll', poll);
  }
}
