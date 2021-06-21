import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./interview.component.css'],
  encapsulation: ViewEncapsulation.None
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
        "<div class='downer'>"+p.discribtion+"</div>"+
        "<input type='checkbox' class='checkOpts' value='accept'><input type='text' class='options' placeholder='Refine your response..'></div>";
        count++;
      });

      questionList!.innerHTML += "<button id=\"subPoll\">Submit</button>";
      document.getElementById("subPoll")?.addEventListener('click', (e: any) => {
        let checkCountAnswers = 0;
        console.log(1);
        Array.from(document.querySelectorAll('.checkOpts')).forEach(p => {
          let optionNumber = Array.from(document.querySelectorAll('.checkOpts')).indexOf((<HTMLInputElement>p));

          if((<HTMLInputElement>p).checked){
            if(this.interview.questions != null && this.interview.questions != undefined){
              this.interview.questions[optionNumber].accepted = true;
            }
            checkCountAnswers++;
          }
        });
        console.log(2);
        Array.from(document.querySelectorAll('.options')).forEach(p => {
          let questionNumber = Array.from(document.querySelectorAll('.options')).indexOf((<HTMLInputElement>p));

          if(this.interview.questions != null && this.interview.questions != undefined){
            this.interview.questions[questionNumber].text = (<HTMLInputElement>document.querySelectorAll('.options')[questionNumber]).value;
          }
        });
        console.log(3);
        this.interview.accepted = true;
        console.log(4);
        this.createService.answerInterview(this.interview).subscribe(
          error => {
          console.log(error);
        });
        window.location.href = "/profile/"+this.user.id;
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
