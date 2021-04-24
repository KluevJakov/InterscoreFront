import { Injectable } from '@angular/core';
import { User } from '../models/user';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  clearStorage(): void {
    this.storage.clear();
  }
  getUser(): User {
    return JSON.parse(this.storage.getItem(USER_KEY)!);
  }
  saveUser(user: User): void {
    this.storage.setItem(USER_KEY, JSON.stringify(user));
  }
}
