import { Category } from 'src/app/models/category';
import { Option } from 'src/app/models/option';

export class Test{
    public id?: number;
    public isAccepted?: boolean;
    public name?: string;
    public discribtion?: string;
    public options?: Array<Option>;
    public categories?: Category[];

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; //auto
      this.isAccepted = data?.isAccepted;
      this.name = data?.name; //+
      this.discribtion = data?.discribtion; //+
      this.options = data?.options;
      this.categories = data?.categories;
    }
  }