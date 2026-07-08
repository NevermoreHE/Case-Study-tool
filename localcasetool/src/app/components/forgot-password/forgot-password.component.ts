import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  new_password: string = '';
  new_password_repeat: string = '';
  email: string = '';
  errorMessage : string = '';

  private adminUsername = 'test';
  private adminPassword = 'test';

  constructor(private router: Router, private authService: AuthService) {}

  // onLogin() {
  //   if (this.username === this.adminUsername && this.password === this.adminPassword) {
  //     this.authService.login();
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.errorMessage = 'Unauthorized: Incorrect username or password.';
  //   }
  passwordReset(){
    if(this.new_password === ''){
      this.errorMessage = 'Invalid new password!  The new password is weak';
    }else if(
      this.email === ''){
        this.errorMessage = 'Invalid email -> An email is of format abc@yahoo.com'
      }else if (this.new_password !== this.new_password_repeat){
        this.errorMessage = 'The passwords do not match!  Try again.'
      }
    else{
    this.router.navigate(['/']);
  }
}
}