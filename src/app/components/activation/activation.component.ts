import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.activate(window.location.href.substring(window.location.href.lastIndexOf('/') + 1)).subscribe(e => {
      console.log(e);
    }, error => {
      window.location.href = "/login";
    });
  }

}
