import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  user: User = {} as User;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

}
