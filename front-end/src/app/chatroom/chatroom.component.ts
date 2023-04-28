import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent extends AppComponent {
  @Input()
  searchQuery!: string;
  myUsers: any;
  tempUser: any;
  matches: number[] = [];
  userMatches: any[] = [];
  match: boolean = false;
  currentUser: any = {
    firstName: '',
    lastName: '',
  };
  usersFound: any = {
    firstName: '',
    lastName: '',
    id: '',
  };
  //Hardcoding test
  currentUserId: number = 23;
  test: boolean = true;
  userMessages: any[] = [];
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.fetchCurrentUser();
  }
  fetchMessages(senderId: number, receiverId: number) {
    this.http
      .get(
        `http://localhost:3000/messages?senderId=${senderId}&receiverId=${receiverId}&page=1&pageSize=10`
      )
      .subscribe((data) => {
        // console.log(data);
        this.userMessages = [];
        Object.entries(data).forEach(([key, value]) => {
          this.userMessages.push(value);
          value.createdAt = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        });
      });
    console.log(this.userMessages)
    return this.userMessages;
  }
  searchChat(searchQuery: string) {
    this.http.get(`http://localhost:3000/users/search?match=${searchQuery}`).subscribe(
      (users: any) => this.userMatches = users
    );
  }
  fetchChat(userId: number) {
    this.http.get(`http://localhost:3000/users/searchid?id=${userId}`).subscribe((data) => {
      console.log("data:", data);
      Object.entries(data).forEach(([key, value]) => {
        key == 'firstName' ? (this.currentUser.firstName = value) : false;
        key == 'lastName' ? (this.currentUser.lastName = value) : false;
      });
    });
  }
  fetchChats(userId: number, userName: string, currentUserId: number) {
    this.fetchChat(userId);
    this.fetchMessages(this.currentUserId, userId);
    return this.currentUser;
  }
  fetchCurrentUser() {
    const first = 24; // Decide which is the default chat
    this.fetchChat(first);
    this.fetchMessages(this.currentUserId, first);
  }
}
