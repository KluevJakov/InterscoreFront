import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Interview } from 'src/app/models/interview';
import { Question } from 'src/app/models/question';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { CreateService } from 'src/app/services/create.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'ts-xlsx';

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
  count = 0;
  arrayBuffer:any;
  file!: File;

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
  }

  incomingfile(event: any): void {
    this.file= event.target.files[0]; 
    
    let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            let myJSON = JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(worksheet,{raw:true})));
            
            for(let i = 0;i<myJSON.length;i++){
                this.questionList.push(new Question());
                let questions = document.getElementById("questions");

                questions!.innerHTML+= "<div class='quest'>"+
                "<div class='upper'><input value='"+myJSON[i]["name"]+"' type='text' class='pollTitle' placeholder='Название вопроса' name='title'>"+
                "<select class='categoryList'><option>"+myJSON[i]["category"]+"</option></select></div>"+
                "<div class='downer'><textarea class='discrPoll' placeholder='Описание вопроса' name='discription'>"+myJSON[i]["discribtion"]+"</textarea>"+
                "</div>"+
                "</div>";

                this.questionList[this.count].name = myJSON[i]["name"];
                this.questionList[this.count].discribtion = myJSON[i]["discribtion"];
                this.questionList[this.count].category =  myJSON[i]["category"];
                this.count++;
            }
        }
        fileReader.readAsArrayBuffer(this.file);
  }

  createInterview(): void{
    this.currentInterview.name =  (<HTMLInputElement>document.getElementById("nameOfInterview")).value;
    this.currentInterview.place =  (<HTMLInputElement>document.getElementById("placeOfInterview")).value;
    this.currentInterview.createDate = (<HTMLInputElement>document.getElementById("dateOfInterview")).value;
    this.currentInterview.questions = this.questionList;
    let interviewee = new User();
    let interviewer = new User();
    interviewee.id = parseInt((<HTMLInputElement>document.getElementById("usersList")).value);
    interviewer.id = this.user.id;
    this.currentInterview.interviewee = interviewee;
    this.currentInterview.interviewer = interviewer;
    
    //alert(this.currentInterview.questions);

    this.createService.createInterview(this.currentInterview)
      .subscribe(
        response => {
        //this.storageService.saveUser(new User(response));
        //this.router.navigate(['/']).then(() => location.reload());
      }, error => {
        console.log(error);
        window.location.href = "/profile/"+this.user.id;
      });
  }

  addQuestion(): void{
    this.questionList.push(new Question());

    let questions = document.getElementById("questions");
    questions!.innerHTML+= "<div class='quest'>"+
      "<div class='upper'><input type='text' class='pollTitle' placeholder='Название вопроса' name='title'>"+
      "<select class='categoryList'></select></div>"+
      "<div class='downer'><textarea class='discrPoll' placeholder='Описание вопроса' name='discription'></textarea>"+
      "</div>"+
      "</div>";

      this.updateQuestion();
  }

  updateQuestion(): void{

    let categoryList = document.getElementsByClassName("categoryList")[this.count];
    
    for(let i=0;i<this.catList.length;i++){
      if(this.catList[i].parent?.parent != null){
        categoryList!.innerHTML += "<option value=\""+this.catList[i].name+"\">--"+this.catList[i].name+"</option>";
      }else if(this.catList[i].parent != null){
        categoryList!.innerHTML += "<option value=\""+this.catList[i].name+"\">-"+this.catList[i].name+"</option>";
      }else{
        categoryList!.innerHTML += "<option value=\""+this.catList[i].name+"\">"+this.catList[i].name+"</option>";
      }
    }

    for(let i=0;i<this.questionList.length;i++){
      (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = this.questionList[i].name as string;
      (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = this.questionList[i].discribtion as string;
      (<HTMLInputElement>document.getElementsByClassName('categoryList')[i]).value = this.questionList[i].category as string;

      if(this.questionList[i].name === undefined){
        (<HTMLInputElement>document.getElementsByClassName('pollTitle')[i]).value = "";
      }
      if(this.questionList[i].discribtion === undefined){
        (<HTMLInputElement>document.getElementsByClassName('discrPoll')[i]).value = "";
      }
    }

    document.querySelectorAll('.pollTitle').forEach((item) => {
      item.addEventListener('keyup', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('pollTitle')).indexOf(e.target);
        this.questionList[currentIndex].name = e.target.value;
      });
    });

    document.querySelectorAll('.discrPoll').forEach((item) => {
      item.addEventListener('keyup', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('discrPoll')).indexOf(e.target);
        this.questionList[currentIndex].discribtion = e.target.value;
      });
    });

    document.querySelectorAll('.categoryList').forEach((item) => {
      item.addEventListener('change', (e: any) =>{
        let currentIndex = Array.from(document.getElementsByClassName('categoryList')).indexOf(e.target);
        this.questionList[currentIndex].category = e.target.value;
      });
    });
    this.count++;
  }
}
