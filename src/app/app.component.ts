// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8fafc;
    }
  `]
})
export class AppComponent {
  title = 'user-management-app';
}