import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  isAuthenticated!: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = false;
  }

  public isAuth(): boolean{
    const token = localStorage.getItem('token')
    return token !== null
  }

  public post(url: string, data: { email: string, password: string }, redirectUrl: string) {
    this.http.post(url, data).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status === 401){
          alert('user or password invalid');
        }
        return of(null);
      })
    ).subscribe(
      (response: any) => {
        try {
          if (response) {
            this.isAuthenticated = true;
            this.router.navigate([redirectUrl]);
            localStorage.setItem('token',response.token);
            localStorage.setItem('user',JSON.stringify(response.user));
          } else {
            this.isAuthenticated = false;

          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  }



  public logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
