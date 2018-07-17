import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  user: FormControl;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'user': [null, [Validators.required, Validators.minLength(5)]],
      'password': [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  login(credential) {
    console.log('credential = ', credential);
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
    error => {},
    () => {
      console.log('login success');
    });
  }
}
