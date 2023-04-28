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
    this.fetchUsers();
    this.fetchCurrentUser();
  }
  searchChat(searchQuery: string) {
    console.log(searchQuery);
    this.matches.splice(0);
    this.userMatches.splice(0);
    this.usersFound = {};
    // console.log(this.myUsers);
    if (searchQuery !== undefined) {
      Object.entries(this.myUsers).forEach(([key, value]) => {
        this.tempUser = value;
        if (
          this.tempUser.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          this.tempUser.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          this.tempUser.phone
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          this.tempUser.email.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          this.usersFound = {
            firstName: this.tempUser.firstName,
            lastName: this.tempUser.lastName,
            id: this.tempUser.id,
          };
          this.userMatches.push(this.usersFound);
          this.matches.push(this.tempUser.id);
        }
        // this.tempUser.firstName
        //   .toLowerCase()
        //   .includes(searchQuery.toLowerCase())
        //   ? console.log(
        //       `firstname match ${this.tempUser.firstName} with ${searchQuery}`
        //     )
        //   : false;
        // this.tempUser.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        //   ? console.log(
        //       `firstname match ${this.tempUser.lastName} with ${searchQuery}`
        //     )
        //   : false;
        // this.tempUser.email.toLowerCase().includes(searchQuery.toLowerCase())
        //   ? console.log(
        //       `email match ${this.tempUser.email} with ${searchQuery}`
        //     )
        //   : false;
        // this.tempUser.phone.toLowerCase().includes(searchQuery.toLowerCase())
        //   ? console.log(
        //       `phone match ${this.tempUser.phone} with ${searchQuery}`
        //     )
        //   : false;
        // console.log(this.myUsers);
        // this.myUsers = data;
        // console.log(`La busqueda coincide con ${this.tempUser.firstName}`);
      });
      console.log(this.userMatches);
      console.log(this.matches);
      return this.tempUser;
    }
  }
  fetchUsers() {
    this.http.get('https://dummyjson.com/users').subscribe((data) => {
      // console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        // console.log(key, value);
        key == 'users' ? (this.myUsers = value) : true;
      });
      console.log(this.myUsers);
      // this.myUsers = data;
      return this.myUsers;
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
