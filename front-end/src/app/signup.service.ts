import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private router: Router) { }

  public post(url: string, formGroup: FormGroup, redirectUrl: string) {
    this.http.post(url, formGroup.value).subscribe(
      (response: any) => {
        try {
          if (response) {
            // La autenticación fue exitosa, redirigir al usuario a la página deseada
            this.router.navigate([redirectUrl]);
          } else {
            // La autenticación falló, mostrar un mensaje de error al usuario
            console.log('Bad autentication');
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
}
