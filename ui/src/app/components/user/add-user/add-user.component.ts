import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  myForm: FormGroup;

  constructor(private userService: UserService, private location: Location, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      'username': [null, [Validators.required, Validators.minLength(5)]],
      'password': [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  createUser(credential) {
    if (!credential.username) {
      alert('user name is required.');
      return;
    }
    if (!credential.password) {
      alert('password is required.');
      return;
    }
    this.userService.createUser(credential).subscribe(result => {
      console.log('result', result);
      if (!result) {
        return;
      }
      this.router.navigateByUrl('/user/users');
    }, 
    error => {
      console.log('createUser error', error);
      alert(error.error);
    });
  }

  goBack() {
    this.location.back();
  }
}
