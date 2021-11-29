import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ]),
    balance: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(9),
    ])
  });

  constructor(
    public readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.checkToken();
  }

  submit() {
    if (
      !this.signUpForm.touched
      || !this.signUpForm.dirty
      || this.signUpForm.invalid
    ) {
      return;
    }

    const { username, password, name, balance } = this.signUpForm.value; 

    this.userService.signup({
      username,
      password,
      name,
      balance: Number(balance)
    });
    this.signUpForm.reset();
  }

  listenForEnter($event: KeyboardEvent) {
    if ($event.keyCode === 13 || $event.code === 'Enter') {
      this.submit();
    }
  }
}
