import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userPage(id: string): Observable<User> {
    return this.http.get<User>(API_URL + '/profile/' + id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/getAllUsers');
  }

  postFile(fileToUpload: string, idUser :number): Observable<any> {
    return this.http.post(API_URL + '/uploadFile/'+idUser, fileToUpload);
  }
}
