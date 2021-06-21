import {Role} from './role';

export class User{
    id?: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    birthday?: string;
    sex?: string;
    photo?: string;
    location?: string;
    phone?: string;
    email?: string;
    password?: string;
    langs?: string;
    role?: Role;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; //auto
      this.name = data?.name; //+
      this.surname = data?.surname; //+
      this.patronymic = data?.patronymic; //+
      this.birthday = data?.birthday; //+
      this.sex = data?.sex; //+
      this.location = data?.location;
      this.phone = data?.phone; //+
      this.photo = data?.photo;
      this.email = data?.email; //+
      this.password = data?.password; //+
      this.langs = data?.langs;
      this.role = data?.role; //auto
    }
  }