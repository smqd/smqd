import { Base } from "./base";

export class Login extends Base {
  //code: number;
  result: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    refresh_token_expires_in: number;
    access_token_expires_in: number;
  }
}