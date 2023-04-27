import { Component, Input } from '@angular/core';
import { SignUpService } from '../signup.service';
import { Router } from '@angular/router';
import {  FormGroup,FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormArray } from '@angular/forms'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    )]),
    passwordConfirm: new FormControl('', [Validators.required, confirmPasswordValidator])
  },
  {
    validators: confirmPasswordValidator
  });

  constructor(private SignUp:SignUpService,private router:Router){

  }

  onSubmit(){
    // this.SignUp.post('https://dummyjson.com/auth/login',this.signUpForm,"/chatroom")
    console.warn(this.signUpForm.value);

  }

}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirm');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { 'confirmPasswordMismatch': true }
    : null;
};







