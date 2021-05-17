export class Interview{
    constructor(data: any) {
      this.id = data.id; //auto
      this.name = data.name; //+
      this.surname = data.surname; //+

    }
    
    id: number;
    name: string;
    surname: string;
  }