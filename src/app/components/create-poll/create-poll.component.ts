import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { Option } from 'src/app/models/option';
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
  testList: Array<Test> = [];
  count = 0;

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

    let questions = document.getElementById("questions");
    questions!.innerHTML+= "<style>.discrPoll{width: 65%;} .downer {width: 100%;display: flex;justify-content: space-between;} .quest {height: 220px;border: 2px solid white;padding: 20px;width: 80%;background: #ffffff4d;margin-bottom: 30px;} .upper {display: flex;justify-content: space-between;margin-bottom: 15px;} .pollTitle{width: 40%;height: 35px;} .usersList {width: 40%;} .opts {width: 20%;height: 35px;}</style>";
  }

  createPoll(): void{
    for(let i=0;i<this.testList.length;i++){
      this.testList[i].name = (<HTMLInputElement>document.getElementsByClassName("pollTitle")[i]).value;
      this.testList[i].discribtion = (<HTMLInputElement>document.getElementsByClassName("discrPoll")[i]).value;
      this.testList[i].isAccepted = false;
    }
  }

  updateQuestion(): void{
    for(let i=0;i<this.testList.length;i++){
      (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = this.testList[i].name as string;
      (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = this.testList[i].discribtion as string;

      if(this.testList[i].name === undefined){
        (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = "";
      }
      if(this.testList[i].discribtion === undefined){
        (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = "";
      }
    }

    document.querySelectorAll('.pollTitle').forEach((item) => {
      item.addEventListener('keyup', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('pollTitle')).indexOf(e.target);
        this.testList[currentIndex].name = e.target.value;
      });
    });

    document.querySelectorAll('.discrPoll').forEach((item) => {
      item.addEventListener('keyup', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('discrPoll')).indexOf(e.target);
        this.testList[currentIndex].discribtion = e.target.value;
      });
    });

    document.querySelectorAll('.usersList').forEach((item) => {
      item.addEventListener('change', (e: any) =>{
        alert("!");
        //let currentIndex = Array.from(document.getElementsByClassName('discrPoll')).indexOf(e.target);
        //this.testList[currentIndex].discribtion = e.target.value;
      });
    });

    document.querySelectorAll('.opts').forEach((item) => {
      item.addEventListener('input', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('opts')).indexOf(e.target);

        this.testList[currentIndex].options?.push(new Option());

        let optionList = document.getElementsByClassName("options")[currentIndex];
        optionList!.innerHTML+= "<input type='radio'>"+
        "<input type='text' class='pollTitle' placeholder='Вариант ответа' name='op'>";
      });
    });

    this.count++;
  }

  addQuestion(): void{
    this.testList.push(new Test());

    let questions = document.getElementById("questions");
    questions!.innerHTML+= "<div class='quest'>"+
      "<div class='upper'><input type='text' class='pollTitle' placeholder='Название вопроса' name='title'>"+
      "<select class='usersList'></select> </div>"+
      "<div class='downer'><textarea class='discrPoll' placeholder='Описание вопроса' name='discription'></textarea>"+
      "<input type='number' class='opts' name='opts' min='2' max='8'>"+
      "</div><div class='options'></div>"+
      "</div>";

      this.updateQuestion();
  }
}
