import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/validators/custom-validators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private signupForm: FormGroup;
  private hidePassword: boolean;


  constructor(
    private formBuilder: FormBuilder,
    public translateService: TranslateService
    ) {
    this.hidePassword = true;
    this.translateService.setDefaultLang('es');
  }

  ngOnInit() {
    this.createSignUpForm();
  }

  get nameIsNoValid() {
    return this.signupForm.get('name').invalid && this.signupForm.get('name').touched
  }

  get lastnameIsNoValid() {
    return this.signupForm.get('lastname').invalid && this.signupForm.get('lastname').touched
  }

  get emailIsNoValid() {
    return this.signupForm.get('email').invalid && this.signupForm.get('email').touched
  }

  get passwordIsNoValid() {
    return this.signupForm.get('password').invalid && this.signupForm.get('password').touched
  }

  get confirmPasswordIsNoValid() {
    return this.signupForm.get('confirmPassword').invalid && this.signupForm.get('confirmPassword').touched
  }

  get passwordsNotMatch() {
    if (this.signupForm.controls.confirmPassword.errors) {
      return this.signupForm.controls.confirmPassword.errors.confirmPassword && this.signupForm.get('confirmPassword').touched
    } else return false
  }

  createSignUpForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: CustomValidators.MatchPassword
      })
  }

  changeVisiblityPass():void {
    this.hidePassword = !this.hidePassword;
  }

  signUp(): void {
    console.log(this.signupForm);
  }

}
