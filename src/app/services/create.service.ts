import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import {environment} from '../../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private http: HttpClient,
    private router: Router) { }

  createPoll(poll: Poll): Observable<any> {
    alert(poll);
    return this.http.post<any>(API_URL + '/pollCreate', poll);
  }
}
