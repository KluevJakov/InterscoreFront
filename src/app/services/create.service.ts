import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import {environment} from '../../environments/environment';
import { UserService } from './user.service';
import { StorageService } from './storage.service';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) { }

  createPoll(poll: Poll): Observable<any> {
    if(poll && poll.tests && poll.tests[0].options){
      poll.interviewee_id = this.storageService.getUser().id;
    }
    return this.http.post<any>(API_URL + '/pollCreate', poll);
  }

  
}
