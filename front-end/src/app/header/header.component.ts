import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  // isAuthenticated: boolean = false;

  constructor(private Auth: AuthService, private router: Router) {}

  isAuthenticated=localStorage.length!==0


  ngOnInit(): void {
    this.Auth.isAuthenticated;
   }

  logout() {
    this.Auth.logout();
  }
}

