import { Base } from "./base";

export class Subscriber {
  topic: string;
  qos: number;
  actor: string;
}
export class Subscription {
  topic: string;
  subscribers:Subscriber[];
}

export class Subscriptions extends Base {
  //code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: Subscription[];
  }
}

export class SubscriptionResult extends Base {
  result: Subscription;
}
