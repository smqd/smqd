import { Component, OnInit } from '@angular/core';
import { Clients } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Clients;
  condition = {page_size:10, curr_page: 1}

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients(this.condition);
  }

  getClients(condition) {
    //this.loaderService.showLoader();
    this.clientService.getClients(condition).subscribe(
      clients => {
        if (clients['code']) {
          return;
        }
          
        this.clients = clients;
        //this.loaderService.hideLoader();
      }
    );
  }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    this.getClients(this.condition);
  }
}
