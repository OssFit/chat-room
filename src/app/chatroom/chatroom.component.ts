import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent extends AppComponent{
  override isDarkMode: boolean = false;

}
