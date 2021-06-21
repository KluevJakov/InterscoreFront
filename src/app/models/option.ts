export class Option{
    public id?: number;
    public isTrue?: boolean;
    public text?: string;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; 
      this.text = data?.text; 
      this.isTrue = data?.isTrue;
    }

  }