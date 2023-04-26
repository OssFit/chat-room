import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent extends AppComponent  implements OnInit{
  public image!:string;
  override isDarkMode: boolean = false;

  ngOnInit(): void {
    this.image='http://vidatech.pe/wp-content/uploads/2020/09/redes-sociales-2-1.png';

  }
}

