import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegistration : FormGroup;
  public errorMessage: '' = "";
  public errorFlag = false;

  constructor(public fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              private storageService: StorageService
              ) {
    this.formRegistration = this.fb.group({
      email: [``],
      password: [``],
      name: [``],
      surname: [``],
      patronymic: [``],
      photo: "/assets/images/icon_download.png"
    });
   }

  ngOnInit(): void {
  }

  auth(): void {
    this.authService.register(this.formRegistration)
      .subscribe(
        response => {
        this.storageService.saveUser(new User(response));
        this.router.navigate(['/']).then(() => location.reload());
      },
        (error) => {
          this.errorMessage = error.error;
          this.errorFlag = true;
      });

    }
}
