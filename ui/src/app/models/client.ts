import { Base } from "./base";
import { Subscriber } from "./subscription";

export class Client {
  clientId: string;
  channelId: number;
  subscriptions: Subscriber[];
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
