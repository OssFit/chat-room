import { Component,Input } from '@angular/core';
import { AuthService } from '../auth-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() email!: string;
  @Input() password!: string;

  constructor(private Auth:AuthService){

  }

  onSubmit(){
    this.Auth.post('https://dummyjson.com/auth/login',{username:this.email,password:this.password},"/chatroom")

  }

}
