import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  public isAuth(): boolean{
    const token=localStorage.getItem('token')
    return token !== null }

   public post(url: string, data: { username: string, password: string }, redirectUrl: string) {
    this.http.post(url, data).subscribe(
      (response: any) => {
        try {
          if (response) {
            console.log(response)
            this.isAuthenticated = true;
            this.router.navigate([redirectUrl]);
            localStorage.setItem('token', response.headers ? response.headers.get('x-acces-token') : null);
          } else {
           this.isAuthenticated = false;
           console.log('error')
          }
        } catch (error) {
          console.log('error');
        }
      }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
