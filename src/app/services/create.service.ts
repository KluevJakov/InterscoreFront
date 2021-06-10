import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import {environment} from '../../environments/environment';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Category } from '../models/category';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) { }

  createPoll(poll: Poll): Observable<any> {
    return this.http.post<any>(API_URL + '/pollCreate', poll);
  }

  categoryCreate(cat: Category): Observable<any> {
    return this.http.post<any>(API_URL + '/categoryCreate', cat);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/getAllCategories');
  }
}
