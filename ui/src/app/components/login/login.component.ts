import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  user: FormControl;
  password: FormControl;
  
  errorMessage: string;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      // 'user': [null, [Validators.required, Validators.minLength(5)]],
      // 'password': [null, [Validators.required, Validators.minLength(5)]]
      'user': [null],
      'password': [null]
    });
  }

  login(credential) {
    this.auth.login(credential).subscribe(result => {
      console.log('result', result);
      if (!result) {
        return;
      }
      // data setting
      // (<FormControl>this.myForm.controls['username']).setValue('John', {onlySelf: true});
      // (<FormGroup>this.myForm).setValue(people, { onlySelf: true });
      //this.eventService.dispatchEvent('login:success');
      this.router.navigateByUrl('/monitoring/dashboard');
    }, 
    error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status == 0) {
          this.errorMessage = 'Unable to connect to the server!';
        } else if (error.status == 401) {
          this.errorMessage = error.error.error;
        }
      }
    });
  }
}
