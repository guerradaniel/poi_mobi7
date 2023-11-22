import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  maxDate: Date;

  constructor(){
    this.maxDate = new Date(Date.now());
  }

}
