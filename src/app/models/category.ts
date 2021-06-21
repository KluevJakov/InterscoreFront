export class Category{
    id?: number;
    name?: string;
    parent?: Category;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; 
      this.name = data?.name; 
      this.parent = data?.parent; 
    }
  }