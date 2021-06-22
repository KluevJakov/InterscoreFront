import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  public errorMessage: '' = "";
  public errorFlag = false;
  constructor(
    private storageService: StorageService,
    public fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private authService: AuthService,
    private router: Router
    ) {
    this.formLogin = this.fb.group({
      email: [``],
      password: [``]
    });
   }

   ngOnInit(): void {
    //this.titleService.setTitle('Авторизация');
  }

  auth(): void {
    this.authService.login(this.formLogin)
      .subscribe(
        response => {
        this.storageService.saveUser(new User(response));
        //alert(this.storageService.getUser().role);
        this.router.navigate(['/']).then(() => location.reload());
      },
      (error) => {
          this.errorMessage = error.error;
          this.errorFlag = true;
      });

  }

  /*
  auth(): void {
    alert(this.formLogin.controls["email"].value);
    alert(this.formLogin.controls["password"].value);
  }
  */
}
