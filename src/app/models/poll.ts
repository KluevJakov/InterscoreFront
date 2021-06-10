import { Test } from "./test";
import { User } from "./user";

export class Poll{
    id?: number;
    name?: string;
    accepted?: boolean;
    createDate?: string;
    interviewer?: User;
    interviewee?: User;
    tests?: Array<Test>;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; 
      this.accepted = data?.accepted;
      this.createDate = data?.createDate;
      this.name = data?.name; 
      this.interviewee = data?.interviewee;
      this.interviewer = data?.interviewer;
      this.tests = data?.tests;
    }
  }