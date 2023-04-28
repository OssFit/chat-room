import { Component,Input } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() email!: string;
  @Input() password!: string;

  constructor(private Auth:AuthService,private router:Router){

  }

  onSubmit(){
    this.Auth.post('http://localhost:3000/auth/signin',{username:this.email,password:this.password},"/chatroom")

  }

}
