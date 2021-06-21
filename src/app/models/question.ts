export class Question{
    public id?: number;
    public accepted?: boolean;
    public name?: string;
    public text?: string;
    public discribtion?: string;
    public category?: string;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id;
      this.accepted = data?.accepted;
      this.name = data?.name; 
      this.discribtion = data?.discribtion; 
      this.text = data?.text;
      this.category = data?.category;
    }
  }