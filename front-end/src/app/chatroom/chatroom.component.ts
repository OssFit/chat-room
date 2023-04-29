import {
  Component,
  Input,
  ChangeDetectorRef,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent extends AppComponent {
  @Input()
  searchQuery!: string;
  @ViewChild('messagesList') messagesList!: ElementRef;
  @ViewChildren('messages') messagesElem!: QueryList<any>;
  newMessage!: string;
  myUsers: any;
  tempUser: any;
  matches: number[] = [];
  userMatches: any[] = [];
  match: boolean = false;
  currentUser: any = {
    id: 0,
    firstName: '',
    lastName: '',
  };
  //Hardcoding test
  myId: number = JSON.parse(localStorage.getItem('user')!).id;
  test: boolean = true;
  userMessages: any[] = [];
  sendDisabled: boolean = true;
  socket: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    super();
    console.log(localStorage.getItem('user'));
    
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.fetchCurrentUser();
    this.socket.on('newMessage', (message: any) => {
      // add the new message to the userMessages array
      message.createdAt = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.userMessages.push(message);
      // detect changes manually since the update is happening outside of Angular
      this.cdr.detectChanges();
    });
  }
  ngAfterViewInit() {
    // Scroll to bottom of chat
    this.messagesElem.changes.subscribe(() =>
      this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight
    );
  }
  fetchMessages(senderId: number, receiverId: number) {
    this.http
      .get(
        `http://localhost:3000/messages?senderId=${senderId}&receiverId=${receiverId}&page=1&pageSize=1000`
      )
      .subscribe((data) => {
        this.userMessages = [];
        Object.entries(data).forEach(([key, value]) => {
          this.userMessages.push(value);

          value.createdAt=this.userMessages.map((e)=>new Date(e.createdAt).toLocaleTimeString('es-ES', { hour12: false,hour:'2-digit',minute:'2-digit' }))
          value.createdAt=value.createdAt.pop()
          // value.createdAt = new Date().toLocaleTimeString([], {
          //   hour: '2-digit',
          //   minute: '2-digit',
          // });
        });
      });
    return this.userMessages;
  }

  searchChat(searchQuery: string) {
    this.http.get(`http://localhost:3000/users/search?match=${searchQuery}`).subscribe(
      (users: any) => this.userMatches = users
    );
  }

  fetchChat(userId: number) {
    this.http.get(`http://localhost:3000/users/searchid?id=${userId}`).subscribe((data) => {
      Object.entries(data).forEach(([key, value]) => {
        key == 'id' ? (this.currentUser.id = value) : false;
        key == 'firstName' ? (this.currentUser.firstName = value) : false;
        key == 'lastName' ? (this.currentUser.lastName = value) : false;
      });
    });
  }

  fetchChats(userId: number, userName: string) {
    this.fetchChat(userId);
    this.fetchMessages(this.myId, userId);
    this.sendDisabled = false;
    console.log(this.sendDisabled);
    return this.currentUser;
  }

  fetchCurrentUser() {
    const first = 24; // Decide which is the default chat
    this.fetchChat(first);
    this.fetchMessages(this.myId, first);
  }

  sendMessage() {
    if (!this.newMessage) return;
    const body = {senderId: this.myId, receiverId: this.currentUser.id, content: this.newMessage}
    this.newMessage = '';
    this.http.post('http://localhost:3000/messages', body).subscribe((data: any) => {
      if (data) {
        data.createdAt = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        this.userMessages.push(data)
      }    });
  }

}
