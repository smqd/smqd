import { Base } from "./base";

export class User {
  username: string;
  password: string;
}

export class UsersResult extends Base {
  //code: number;
  result: User[]
}

export class UserResult extends Base {
  result : User;
}