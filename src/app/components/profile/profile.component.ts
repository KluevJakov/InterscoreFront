import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  catList: Array<Category> = new Array();
  public isAuth = false;
  public isAdmin = false;
  public inter = "";
  public currentUser = false;
  public isImage = false;
  public fileToUpload!: string;
  //private error = "";

  constructor(private route: ActivatedRoute, private createService: CreateService, private authService: AuthService, private userService: UserService, private storageService: StorageService) { }

  /* Загрузка фото профиля */
  uploadFileToActivity() {
    this.userService.postFile(this.fileToUpload,this.storageService.getUser().id as number).subscribe(
      response => {
       
      }, error => {
        console.log(error);
        window.location.reload();
      });
  }

   /* Валидация фото профиля */
  handleFileInput(event?: Event) {
    this.fileToUpload = (<HTMLInputElement>event?.target).value;

    const img = new Image();
    img.onload = () => { 
      this.uploadFileToActivity();
      document.getElementById("AddImage")!.style.border = "2px solid green";
    }
    img.onerror = () => {
      document.getElementById("AddImage")!.style.border = "2px solid red";
    }
    img.src = this.fileToUpload;
  }

  /* Создание  категории */
  setCategory(event?: Event) {
    let category = new Category();
    category.name = (<HTMLInputElement>document.getElementById("category")).value;
    let rootCategory = new Category();
    rootCategory.id = parseInt((<HTMLInputElement>document.getElementById("categoryList")).value);
    category.parent = rootCategory;
    this.createService.categoryCreate(category)
      .subscribe(
        response => {
        alert("ok");
      }, error => {
        console.log(error);
        window.location.reload();
      });
  }

  /* Удаление категории */
  delCategory(event?: Event) {
    alert((<HTMLInputElement>document.getElementById("categoryList")).value);
    alert((<HTMLInputElement>document.getElementById("category")).value);
  }

  ngOnInit(): void {
    /* Инициализация страницы пользователя */
    const id = this.route.snapshot.paramMap.get('id') || "1";
    this.userService.userPage(id).subscribe(response => {
      this.user = response;
    },
    error =>{
      //alert(error.error);
    });

    /* Проверки разграничения доступа */
    if(this.storageService.getUser() != null){
      this.isAuth = true;
    }
    if(this.storageService.getUser() != null){
      if((this.storageService.getUser().role?.toString()) == Role[0].toString()){
        this.isAdmin = true;
        this.inter = "Interviewer";
      }else{
        this.inter = "Interviewee";
      }
    }
    if(this.storageService.getUser() != null){
      if(this.storageService.getUser().id?.toString() == id){
        this.currentUser = true;
      }
    }

    /* Притягивания категорий */
    let categoryList = document.getElementById("categoryList");
    categoryList!.innerHTML += "<option value=\""+null+"\">-</option>";

    this.createService.getAllCategories().subscribe(response => {
      response.forEach(u => {
        categoryList!.innerHTML += "<option value=\""+u.id+"\">"+u.name+"</option>";
      });
    });

    //alert(this.storageService.getUser().id);
    /* Отображение выданных опросов */
    let pollList = document.getElementById("pollList");
    this.createService.getMyPolls(this.storageService.getUser().id!).subscribe(response => {
      response.forEach(u => {
        pollList!.innerHTML += "<div class=\"pollDiv\">"+u.name+"</div>";
      });
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
