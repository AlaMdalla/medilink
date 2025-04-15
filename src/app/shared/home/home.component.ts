import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = 'Welcome to the E-learning Platform';
  description: string = 'Elevate your skills and career with our world-class online courses.';
}
