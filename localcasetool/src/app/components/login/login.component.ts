import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private adminUsername = 'test';
  private adminPassword = 'test';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (this.username === this.adminUsername && this.password === this.adminPassword) {
      this.authService.login();
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Unauthorized: Incorrect username or password.';
    }
  }
}