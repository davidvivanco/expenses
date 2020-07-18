import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  private hidePassword: boolean;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.hidePassword = true;
   }

  ngOnInit() {
    this.createLoginForm();
  }


  get emailIsNoValid() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched
  }

  get passwordIsNoValid() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  changeVisiblityPass() {
    console.log('changeVisiblityPass');
    this.hidePassword = !this.hidePassword;
  }

}
