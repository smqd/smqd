import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../node_modules/@angular/router';

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
    this.userService.createUser(credential).subscribe(result => {
      console.log('result', result);
      if (!result) {
        return;
      }
      // data setting
      // (<FormControl>this.myForm.controls['username']).setValue('John', {onlySelf: true});
      // (<FormGroup>this.myForm).setValue(people, { onlySelf: true });
      //this.eventService.dispatchEvent('login:success');
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
