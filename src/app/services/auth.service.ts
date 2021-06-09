import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';
import { StorageService } from './storage.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) {
      this.user = storageService.getUser();
    }

    login(form: FormGroup): Observable<any> {
      return this.http.post<any>(API_URL + '/login', form.value);
    }
    register(form: FormGroup): Observable<any> {
      return this.http.post<any>( API_URL + '/registration', form.value);
    }
  
    logout(): void {
      this.storageService.clearStorage();
      this.router.navigateByUrl('/').then(() => location.reload());
    }
}
