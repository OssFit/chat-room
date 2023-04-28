import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  public isAuth(): boolean{
    const token=localStorage.getItem('token')
    return token !== null }

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
              localStorage.setItem('id', response.user.id);
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
    localStorage.removeItem('id')
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
