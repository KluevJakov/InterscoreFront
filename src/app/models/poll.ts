import { Test } from "./test";
import { User } from "./user";

export class Poll{
    id?: number;
    is_accepted?: boolean;
    name?: string;
    interviewer?: User;
    interviewee?: User;
    tests?: Array<Test>;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; 
      this.is_accepted = data?.is_accepted;
      this.name = data?.name; 
      this.interviewee = data?.interviewee;
      this.interviewer = data?.interviewer;
      this.tests = data?.tests;
    }
  }