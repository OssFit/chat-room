import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private Auth: AuthService, private router: Router) {}

  logout() {
    this.Auth.logout();
    this.isLoggedIn = false;
  }

  isAuthenticated(){
    return this.Auth.isAuth();
  }
}

