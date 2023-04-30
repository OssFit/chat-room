import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title!:string
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
