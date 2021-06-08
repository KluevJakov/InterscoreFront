export class Category{
    constructor(data: any) {
      this.id = data.id; 
      this.name = data.name; 
      this.parent = data.parent; 
    }

    id: number;
    name: string;
    parent: Category;
  }