import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  darkMode=false
  constructor(){
    this.detectColorScheme()
  }
detectColorScheme(){
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches){
    document.documentElement.setAttribute('data-theme',this.darkMode?'dark':'light')
  }
}

toggleClick(){
  this.darkMode=!this.darkMode;
  document.documentElement.setAttribute('data-theme',this.darkMode?'dark':'light')
}






}
