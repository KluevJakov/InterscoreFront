import { Test } from "./test";

export class Poll{
    id?: number;
    is_accepted?: boolean;
    name?: string;
    interviewee_id?: number;
    interviewer_id?: number;
    tests?: Array<Test>;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; 
      this.is_accepted = data?.is_accepted;
      this.name = data?.name; 
      this.interviewee_id = data?.interviewee_id;
      this.interviewer_id = data?.interviewer_id;
      this.tests = data?.tests;
    }
  }