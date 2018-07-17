import { Component, OnInit } from '@angular/core';
import { Subscriptions } from '../../../models/subscription';
import { SubscriptionService } from '../../../services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscriptions;
  condition = {page_size:10, curr_page: 1}

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.getSubscriptions(this.condition);
  }

  getSubscriptions(condition) {
    this.subscriptionService.getSubscriptions(condition).subscribe(
      subscriptions => {
        if (subscriptions['code']) {
          return;
        }
          
        this.subscriptions = subscriptions;
      }
    );
  }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    this.getSubscriptions(this.condition);
  }
}
