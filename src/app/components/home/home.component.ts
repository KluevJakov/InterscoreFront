import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAuth = false;
  public currentId = 1;

  constructor(private storageService: StorageService,private authService: AuthService) { }

  ngOnInit(): void {
    if(this.storageService.getUser() != null){
      this.isAuth = true;
      this.currentId = this.storageService.getUser().id as number;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  myProfile(): void {
    document.location.href = '/profile/'+this.currentId;
  }
}
