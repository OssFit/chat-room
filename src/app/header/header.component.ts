import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AppComponent implements OnInit  {
 override isDarkMode: boolean = false;



  ngOnInit(): void {
  }

  onToggleDarkMode() {
    this.isDarkMode=!this.isDarkMode;
    console.log(this.isDarkMode)
  }
}
