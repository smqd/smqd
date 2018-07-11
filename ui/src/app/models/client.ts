import { Base } from "./base";

export class Client {
  topic: string;
  qos: number;
  actor: string;
}

export class Clients extends Base {
  //code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: Client[];
  }
}

export class ClientExact extends Base {
  result: Client;
}
