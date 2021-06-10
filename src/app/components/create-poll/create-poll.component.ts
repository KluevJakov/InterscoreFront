import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { Option } from 'src/app/models/option';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Poll } from 'src/app/models/poll';
import { CreateService } from 'src/app/services/create.service';
import { Category } from 'src/app/models/category';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreatePollComponent implements OnInit {
  user: User = {} as User;
  userList: Array<User> = new Array();
  testList: Array<Test> = new Array();
  catList: Array<Category> = new Array();
  currentPoll: Poll = new Poll();
  count = 0;

  constructor(private userService: UserService, private storageService: StorageService,private createService: CreateService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    let list = document.getElementById("usersList");

    this.userService.getAllUsers().subscribe(response => {
      response.forEach(u => {
        if(u.role?.toString() == Role[1].toString()){
          this.userList.push(u);
          list!.innerHTML += "<option value=\""+u.id+"\">"+u.surname+" "+u.name+" "+u.patronymic +"</option>";
        }
      });
    });

    this.createService.getAllCategories().subscribe(response => {
      response.forEach(u => {
        this.catList.push(u);
      });
    });

    let questions = document.getElementById("questions");
    //questions!.innerHTML+= "<style></style>";
  }

  createPoll(): void{
    this.currentPoll.name =  (<HTMLInputElement>document.getElementById("nameOfPoll")).value;
    this.currentPoll.tests = this.testList;
    let interviewee = new User();
    let interviewer = new User();
    interviewee.id = parseInt((<HTMLInputElement>document.getElementById("usersList")).value);
    interviewer.id = this.user.id;
    this.currentPoll.interviewee = interviewee;
    this.currentPoll.interviewer = interviewer;

    //alert(this.currentPoll.interviewee_id.id);
    //alert(this.currentPoll.interviewer_id.id);

    this.createService.createPoll(this.currentPoll)
      .subscribe(
        response => {
        //this.storageService.saveUser(new User(response));
        //this.router.navigate(['/']).then(() => location.reload());
      }, error => {
        console.log(error);
        window.location.href = "/profile/"+this.user.id;
      });
  }

  updateQuestion(): void{

    let categoryList = document.getElementsByClassName("categoryList")[this.count];
    this.catList.forEach(u=>{
      categoryList!.innerHTML += "<option value=\""+u.name+"\">"+u.name+"</option>";
    });

    for(let i=0;i<this.testList.length;i++){
      (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = this.testList[i].name as string;
      (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = this.testList[i].discribtion as string;
      (<HTMLInputElement>document.getElementsByClassName('opts')[i]).value = this.testList[i].options?.length.toString() as string;
      (<HTMLInputElement>document.getElementsByClassName('categoryList')[i]).value = this.testList[i].category as string;

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

    document.querySelectorAll('.categoryList').forEach((item) => {
      item.addEventListener('change', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('categoryList')).indexOf(e.target);
        this.testList[currentIndex].category = e.target.value;
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
      "<select class='categoryList'></select> </div>"+
      "<div class='downer'><textarea class='discrPoll' placeholder='Описание вопроса' name='discription'></textarea>"+
      "<input type='number' class='opts' name='opts' min='2' max='8'>"+
      "</div><div class='options'></div>"+
      "</div>";

      this.updateQuestion();
  }
}
