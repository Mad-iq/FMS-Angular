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

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }


    this.isLoading = true;

    this.authService.register(this.username, this.password, 'USER').subscribe({
      next: (response) => {
        if (response.id) {
          this.successMessage = 'Registration successful. Login to proceed';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else if (response.error) {
          this.errorMessage = response.error;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.error?.error || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
