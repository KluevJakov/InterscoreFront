import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interview } from 'src/app/models/interview';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  public checkedCount = 0;
  public isAuth = false;
  public isAdmin = false;
  public currentUser = false;
  public isAccepted = "Не пройдено";
  user: User = {} as User;
  interview: Interview = {} as Interview;
  
  constructor(private createService: CreateService,private authService: AuthService,private route: ActivatedRoute,private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    /* Инициализация страницы опроса */
    const id = this.route.snapshot.paramMap.get('id') || "1";
    this.createService.interviewPage(parseInt(id)).subscribe(response => {
      this.interview = response;
      //alert(this.user.id + " " + this.poll.interviewee?.id);
      if(this.interview.accepted || (this.user.id == this.interview.interviewee?.id)){
        if(this.user.id == this.interview.interviewer?.id && !this.interview.accepted){
          this.isAccepted = "Не пройдено";
          let questionList = document.getElementById("questions");
          questionList!.innerHTML += "Интервью ещё не пройдено";
        }else{
          this.isAccepted = "Пройдено";
          let questionList = document.getElementById("questions");
          let trueAnswers = 0;
          Array.from(this.interview.questions!).forEach(el => {
            if(el.accepted){
              trueAnswers++;
            }
          });
          let allAnswers = this.interview.questions?.length;
          questionList!.innerHTML += "Результаты опроса: "+trueAnswers+"/"+allAnswers;
        }
      }else{
        this.isAccepted = "Не пройдено";
      let questionList = document.getElementById("questions");
      let count = 0;
      this.interview.questions?.forEach(p => {
        questionList!.innerHTML += "<div class='quest'>"+
        "<div class='upper'><div>"+p.name+"</div><div>"+p.category+"</div></div>"+
        "<div class='downer'>"+p.discribtion+" "+
        "</div><div class='options'></div>"+
        "</div>";

        let currentOptions = document.getElementsByClassName("options")[count];
        if(this.interview.questions != null){
          let optsCount = 0;
          /*
          this.interview.questions[count].options?.forEach(o => {
            currentOptions!.innerHTML += "<div><input name='radiogroup"+count+"' value='"+optsCount+"' class='checkOpts' type='radio'>"+o.text+"</div>";
            optsCount++;
          });
          */
        }
        count++;
      });

      questionList!.innerHTML += "<button id=\"subPoll\">Submit</button>";
      document.getElementById("subPoll")?.addEventListener('click', (e: any) => {
        let checkCountAnswers = 0;
        Array.from(document.querySelectorAll('.checkOpts')).forEach(p => {
          
          let questionNumber = Array.from(document.querySelectorAll('.options')).indexOf((<HTMLInputElement>p).parentElement!.parentElement!);
          let optionNumber = Array.from(document.querySelectorAll('.checkOpts')).indexOf((<HTMLInputElement>p));

          if((<HTMLInputElement>p).checked){
            if(this.interview.questions != null && this.interview.questions != undefined){
              /*
              if(this.interview.questions[questionNumber].options![optionNumber].isTrue){
                  this.interview.questions[questionNumber].accepted = true;
              }
              */
           }
            checkCountAnswers++;
          }
        });

        if(checkCountAnswers == this.interview.questions?.length){
          this.interview.accepted = true;
          this.createService.answerPoll(this.interview).subscribe(
            error => {
            console.log(error);
          });
          window.location.href = "/profile/"+this.user.id;
        }else{
          alert("Ответьте на все вопросы, для завершения теста");
        }
      }); 
    }
    });

    /* Проверки разграничения доступа */
    if(this.storageService.getUser() != null){
      this.isAuth = true;
    }

    if(this.storageService.getUser() != null){
      if(this.storageService.getUser().id?.toString() == id){
        this.currentUser = true;
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
