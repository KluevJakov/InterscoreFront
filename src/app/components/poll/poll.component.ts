import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Option } from 'src/app/models/option';
import { Poll } from 'src/app/models/poll';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollComponent implements OnInit {
  public checkedCount = 0;
  public isAuth = false;
  public isAdmin = false;
  public currentUser = false;
  public isAccepted = "Не пройдено";
  user: User = {} as User;
  poll: Poll = {} as Poll;

  constructor(private createService: CreateService,private authService: AuthService,private route: ActivatedRoute,private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    /* Инициализация страницы опроса */
    const id = this.route.snapshot.paramMap.get('id') || "1";
    this.createService.pollPage(parseInt(id)).subscribe(response => {
      this.poll = response;
      //alert(this.user.id + " " + this.poll.interviewee?.id);
      if(this.poll.accepted || (this.user.id == this.poll.interviewer?.id)){
        if(this.user.id == this.poll.interviewer?.id && !this.poll.accepted){
          this.isAccepted = "Не пройдено";
          let questionList = document.getElementById("questions");
          questionList!.innerHTML += "Опрос ещё не пройден";
        }else{
          this.isAccepted = "Пройдено";
          let questionList = document.getElementById("questions");
          let trueAnswers = 0;
          Array.from(this.poll.tests!).forEach(el => {
            if(el.accepted){
              trueAnswers++;
            }
          });
          let allAnswers = this.poll.tests?.length;
          questionList!.innerHTML += "Результаты опроса: "+trueAnswers+"/"+allAnswers+"<br>";

          Array.from(this.poll.tests!).forEach(el => {
            if(el.accepted){
              let currentTrue = "style='border: 2px solid green'";
              questionList!.innerHTML += "<div "+ currentTrue +" class='quest'>"+
              "<div class='upper'><div>"+el.name+"</div><div>"+el.category+"</div></div>"+
              "<div class='downer'>"+el.discribtion+" "+
              "</div><div class='options'></div>"+
              "</div>";
            }else{
              let currentTrue = "style='border: 2px solid red'";
              questionList!.innerHTML += "<div "+ currentTrue +" class='quest'>"+
              "<div class='upper'><div>"+el.name+"</div><div>"+el.category+"</div></div>"+
              "<div class='downer'>"+el.discribtion+" "+
              "</div><div class='options'></div>"+
              "</div>";
            }
          });
        }
      }else{
        this.isAccepted = "Не пройдено";
      let questionList = document.getElementById("questions");
      let count = 0;
      this.poll.tests?.forEach(p => {
        questionList!.innerHTML += "<div class='quest'>"+
        "<div class='upper'><div>"+p.name+"</div><div>"+p.category+"</div></div>"+
        "<div class='downer'>"+p.discribtion+" "+
        "</div><div class='options'></div>"+
        "</div>";

        let currentOptions = document.getElementsByClassName("options")[count];
        if(this.poll.tests != null){
          let optsCount = 0;
          this.poll.tests[count].options?.forEach(o => {
            currentOptions!.innerHTML += "<div><input name='radiogroup"+count+"' value='"+optsCount+"' class='checkOpts' type='radio'>"+o.text+"</div>";
            optsCount++;
          });
        }
        count++;
      });

      questionList!.innerHTML += "<button id=\"subPoll\">Submit</button>";
      document.getElementById("subPoll")?.addEventListener('click', (e: any) => {
        let checkCountAnswers = 0;

        //alert(Array.from(document.querySelectorAll('.options')[0].querySelectorAll('.checkOpts')).length);

        Array.from(document.querySelectorAll('.checkOpts')).forEach(p => {
          let questionNumber = Array.from(document.querySelectorAll('.options')).indexOf((<HTMLInputElement>p).parentElement!.parentElement!);
          let optionNumber = Array.from(document.querySelectorAll('.options')[questionNumber].querySelectorAll('.checkOpts')).indexOf((<HTMLInputElement>p));

          console.log(questionNumber+" "+optionNumber);

          if((<HTMLInputElement>p).checked){
            if(this.poll.tests != null && this.poll.tests != undefined){
              if(this.poll.tests[questionNumber].options![optionNumber].isTrue){
                  this.poll.tests[questionNumber].accepted = true;
              }
           }
            checkCountAnswers++;
          }
        });

        if(checkCountAnswers == this.poll.tests?.length){
          this.poll.accepted = true;
          this.createService.answerPoll(this.poll).subscribe(
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
