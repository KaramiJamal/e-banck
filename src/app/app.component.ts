import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'digital-banking-web';

  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.loadProfile({ 'access-token': token });
    }
  }
}
