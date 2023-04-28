import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAuthenticated!: boolean;

  constructor(private Auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.Auth.isAuthenticated;
  }

  logout() {
    this.Auth.logout();
    this.isLoggedIn = false;
  }
}

