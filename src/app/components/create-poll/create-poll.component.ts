import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  user: User = {} as User;
  userList: Array<User> = [];
  pollList: Array<Poll> = [];

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    let list = document.getElementById("usersList");

    this.userService.getAllUsers().subscribe(response => {
      response.forEach(u => {
        this.userList.push(u)
        list!.innerHTML += "<option value=\"1\">"+u.surname+" "+u.name+" "+u.patronymic +"</option>";
      });
    });
  }

  addQuestion(): void{
    let questions = document.getElementById("questions");
    questions!.innerHTML+= "<div class=\"question\">"+
      "<div class=\"upper\"><input type=\"text\" name=\"title\">"+
      "<select id=\"usersList\"></select> </div>"+
      "<textarea name=\"discription\"></textarea>"+
      "<div class=\"options\">"+
      "</div>"+
      "<a (click)=\"addOption()\">Add Option</a>"+
    "</div>";
  }
  addOption(): void{
    let options = document.getElementById("options");
    options!.innerHTML+= "Новый вариант <br>";
  }
}
