import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  email='';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  agreeTerms = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    //trim the inputs first
   const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    if (!username || !email || !password || !confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }


    this.isLoading = true;

    this.authService.register(username,email, password, 'USER').subscribe({
      next: ()=> {
       this.successMessage='Registration successful, Please login';
       this.isLoading=false;
       setTimeout(() => {this.router.navigate(['/login']);
       }, 300);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.error?.error || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
