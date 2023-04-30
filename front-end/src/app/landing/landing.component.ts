import { Component,OnInit } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent extends AppComponent implements OnInit{
  public image!:string;

  ngOnInit(): void {
    this.image='assets/redes-sociales.png';


  }


}

