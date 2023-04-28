import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})

export class ChatroomComponent extends AppComponent implements OnChanges {
  @Input()
  searchQuery!: string;
  myUsers: any;
  tempUser: any;
  matches: number[] = [];
  userMatches: any[] = [];
  match: boolean = false;
  currentUserId: number=1;
  currentUser: any = {
    firstName: '',
    lastName: '',
    messages: [],
  };
  usersFound: any = {
    firstName: '',
    lastName: '',
    id: '',
  };
  constructor(private http: HttpClient) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
    //   console.log(changes);
    //   this.searchChat();
    // }
  }
  ngOnInit() {
    this.fetchCurrentUser();
  }
  searchChat(searchQuery: string) {
    this.fetchUsers(searchQuery, (users: any) => this.userMatches = users)
  }
  fetchUsers(match: string, callback: Function) {
    this.http.get(`http://localhost:3000/users/search?match=${match}`).subscribe((users) => {
      callback(users);
    });
  }
  fetchChat(userId: number){
    this.http.get(`https://dummyjson.com/users/${userId}`).subscribe((data) => {
      console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        key == 'firstName'
          ? (this.currentUser.firstName = value)
          : false;
        key == 'lastName'
          ? (this.currentUser.lastName = value)
          : false;
        if (key == 'address') {
          // this.currentUser.messages = value;
          Object.entries(value).forEach(([key, value], index) => {
            this.currentUser.messages.push(value);
            // console.log(value);
          });
        }
      });
      // console.log(this.currentUser);
    });
  }
  fetchChats(userId: number, userName: string, currentUserId: number,) {
    this.currentUser.messages.splice(0);
    console.log(`User ${userId} (${userName}) has been clicked`);
    this.fetchChat(userId);
    this.fetchChat(currentUserId);
      return this.currentUser;
  }
  fetchCurrentUser() {
    this.http.get('https://dummyjson.com/users/1').subscribe((data) => {
      // console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        key == 'firstName'
          ? (this.currentUser.firstName = value)
          : this.currentUser;
        key == 'lastName'
          ? (this.currentUser.lastName = value)
          : this.currentUser;
        if (key == 'address') {
          // this.currentUser.messages = value;
          Object.entries(value).forEach(([key, value], index) => {
            this.currentUser.messages.push(value);
            // console.log(value);
          });
        }
      });
      // console.log(this.currentUser);
      return this.currentUser;
    });
  }
}
