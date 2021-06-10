import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Interview } from 'src/app/models/interview';
import { Question } from 'src/app/models/question';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { CreateService } from 'src/app/services/create.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateInterviewComponent implements OnInit {
  user: User = {} as User;
  userList: Array<User> = new Array();
  catList: Array<Category> = new Array();
  questionList: Array<Question> = new Array();
  currentInterview: Interview = new Interview();

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
  }

  createInterview(): void{/*
    this.currentPoll.name =  (<HTMLInputElement>document.getElementById("nameOfPoll")).value;
    this.currentPoll.tests = this.testList;
    this.currentPoll.createDate = new Date().toUTCString().toString();
    let interviewee = new User();
    let interviewer = new User();
    interviewee.id = parseInt((<HTMLInputElement>document.getElementById("usersList")).value);
    interviewer.id = this.user.id;
    this.currentPoll.interviewee = interviewee;
    this.currentPoll.interviewer = interviewer;

    this.createService.createPoll(this.currentPoll)
      .subscribe(
        response => {
        //this.storageService.saveUser(new User(response));
        //this.router.navigate(['/']).then(() => location.reload());
      }, error => {
        console.log(error);
        window.location.href = "/profile/"+this.user.id;
      });*/
  }

  addQuestion(): void{
    this.questionList.push(new Question());

    let questions = document.getElementById("questions");
    questions!.innerHTML+= "<div class='quest'>"+
      "<div class='upper'><input type='text' class='pollTitle' placeholder='Название вопроса' name='title'>"+
      "<select class='categoryList'></select> <input type='number' class='opts' name='opts' min='2' max='8'></div>"+
      "<div class='downer'><textarea class='discrPoll' placeholder='Описание вопроса' name='discription'></textarea>"+
      "</div><div class='options'></div>"+
      "</div>";

      //this.updateQuestion();
  }
}
