import { Component } from '@angular/core';
import {Action } from '@lernender/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'io';
  constructor() {
    const action = new Action();
  }
}
