import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsersResult } from '../../models/user';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: UsersResult;
  condition = {page_size:10, curr_page: 1};
  
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => {
        if (users['code']) {
          return;
        }
        
        this.users = users;
      }
    );
  }

  // goCreateUser() {
  //   this.router.navigateByUrl('/user/add');
  // }

  // goEditUser(username) {
  //   this.router.navigate['user', username];
  // }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    //this.getUsers(this.condition);
  }
}
