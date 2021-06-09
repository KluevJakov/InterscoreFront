import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { Option } from 'src/app/models/option';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Poll } from 'src/app/models/poll';
import { CreateService } from 'src/app/services/create.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  user: User = {} as User;
  userList: Array<User> = new Array();
  testList: Array<Test> = new Array();
  currentPoll: Poll = new Poll();
  count = 0;

  constructor(private userService: UserService, private storageService: StorageService,private createService: CreateService) { }

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
    this.currentPoll.name =  (<HTMLInputElement>document.getElementById("nameOfPoll")).value;
    this.currentPoll.tests = this.testList;
    //this.currentPoll.interviewee_id =  (<HTMLInputElement>document.getElementById("nameOfPoll")).value;

    this.createService.createPoll(this.currentPoll)
      .subscribe(
        response => {
        //this.storageService.saveUser(new User(response));
        //this.router.navigate(['/']).then(() => location.reload());
      });
  }

  updateQuestion(): void{
    for(let i=0;i<this.testList.length;i++){
      (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = this.testList[i].name as string;
      (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = this.testList[i].discribtion as string;
      (<HTMLInputElement>document.getElementsByClassName('opts')[i]).value = this.testList[i].options?.length.toString() as string;

      for(let k=0;k<this.count;k++){
        for(let h=0;h<this.testList[k].options!.length;h++){
          (<HTMLInputElement>document.getElementsByName("radiogroup"+k)[h]).checked = this.testList[k].options![h].isTrue as boolean;
          (<HTMLInputElement>document.getElementsByName("op"+k)[h]).value = this.testList[k].options![h].text as string;
        }
      }

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
        //alert("!");
        //let currentIndex = Array.from(document.getElementsByClassName('discrPoll')).indexOf(e.target);
        //this.testList[currentIndex].discribtion = e.target.value;
      });
    });

    document.querySelectorAll('.opts').forEach((item) => {
      item.addEventListener('input', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('opts')).indexOf(e.target);
        this.testList[currentIndex].options = [];
        let optionList = document.getElementsByClassName("options")[currentIndex];
        optionList.innerHTML = "";
        for(let j=0;j<e.target.value;j++){
          this.testList[currentIndex].options?.push(new Option());
          optionList.innerHTML+= "<div><input name='radiogroup"+currentIndex+"' class='checkOpts' type='radio'>"+"<input type='text' class='pollOpts' placeholder='Вариант ответа' name='op"+currentIndex+"'></div>";
          optionList.innerHTML+= "<style>input.pollOpts{width: 80%;height: 37px;} .options{justify-content: space-evenly;flex-direction: column;overflow-x: hidden;overflow-y: auto;height: 116px;margin-top: 15px;border: solid 2px;}</style>";

          document.querySelectorAll('.pollOpts').forEach((item1) => {
            item1.addEventListener('keyup', (e1: any) =>{
              let currentIndex1 = Array.from(document.getElementsByName(e1.target.name)).indexOf(e1.target);
              this.testList[parseInt(e1.target.name.match(/\d+/))].options![currentIndex1].text =  e1.target.value;
            });
          });

          document.querySelectorAll('.checkOpts').forEach((item1) => {
            item1.addEventListener('click', (e1: any) =>{
              let currentIndex1 = Array.from(document.getElementsByName(e1.target.name)).indexOf(e1.target);
              if(e1.target.checked){
                document.getElementsByName(e1.target.name).forEach(e => this.testList[parseInt(e1.target.name.match(/\d+/))].options![currentIndex1].isTrue = false);
                this.testList[parseInt(e1.target.name.match(/\d+/))].options![currentIndex1].isTrue = true;
              }
            });
          });
        }
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
