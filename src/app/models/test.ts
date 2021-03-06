import { Category } from 'src/app/models/category';
import { Option } from 'src/app/models/option';

export class Test{
    public id?: number;
    public accepted?: boolean;
    public name?: string;
    public discribtion?: string;
    public options?: Array<Option>;
    public category?: string;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id;
      this.accepted = data?.accepted;
      this.name = data?.name; 
      this.discribtion = data?.discribtion; 
      this.options = data?.options;
      this.category = data?.category;
    }
  }