import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {
  user: User = {} as User;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

}
