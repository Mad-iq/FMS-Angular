import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  errorMessage = '';
  isLoading = false;
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(){
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) =>{
        if (response.token){
          console.log('Login successful');
          this.router.navigate(['/search-flights']);
        } else if (response.error){
          this.errorMessage = response.error;
        }
        this.isLoading = false;
      },
      error: (error) =>{
        console.error('Login error:', error);
        this.errorMessage = error.error?.error || 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
