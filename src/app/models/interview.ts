import { Question } from "./question";
import { User } from "./user";

export class Interview{
    public id?: number;
    public name?: string;
    public place?: string;
    public createDate?: string;
    public accepted?: boolean;
    public interviewer?: User;
    public interviewee?: User;
    public questions?: Array<Question>;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id;
      this.accepted = data?.accepted;
      this.name = data?.name; 
      this.place = data?.place;
      this.createDate = data?.createDate;
      this.interviewer = data?.interviewer; 
      this.interviewee = data?.interviewee;
      this.questions = data?.questions;
    }
  }