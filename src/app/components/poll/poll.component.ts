import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from 'src/app/models/poll';
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
          this.poll.tests[count].options?.forEach(o => {
            currentOptions!.innerHTML += "<div><input name='radiogroup"+count+"' class='checkOpts' type='radio'>"+o.text+"</div>";
          });
        }
        count++;
      });

    });

    if(this.poll.is_accepted){
      this.isAccepted = "Пройдено";
    }else{
      this.isAccepted = "Не пройдено";
    }

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
