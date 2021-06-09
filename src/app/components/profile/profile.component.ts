import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  public isAuth = false;
  public isAdmin = false;
  public currentUser = false;
  //private error = "";

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || "1";
    this.userService.userPage(id).subscribe(response => {
      this.user = response;
    },
    error =>{
      //alert(error.error);
    });
    if(this.storageService.getUser() != null){
      this.isAuth = true;
    }
    if(this.storageService.getUser() != null){
      if(this.storageService.getUser().role.toString() == Role[0].toString()){
        this.isAdmin = true;
      }
    }
    if(this.storageService.getUser() != null){
      if(this.storageService.getUser().id.toString() == id){
        this.currentUser = true;
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
