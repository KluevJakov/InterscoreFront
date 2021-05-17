export class Poll{
    constructor(data: any) {
      this.id = data.id; //auto
      this.is_accepted = data.is_accepted;
      this.name = data.name; //+
      this.interviewee_id = data.interviewee_id; //+
      this.interviewer_id = data.interviewer_id;
    }
    
//id, is_accepted, name, interviewee_id, interviewer_id

    id: number;
    is_accepted: boolean;
    name: string;
    interviewee_id: string;
    interviewer_id: number;
  }