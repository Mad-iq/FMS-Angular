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
  username= '';
  password= '';
  email='';
  confirmPassword= '';
  errorMessage= '';
  successMessage= '';
  isLoading= false;
  agreeTerms= false;
  //for password strength
  pswdStrength= 0;
  pswdErrors: string[] = [];
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(){
    this.errorMessage = '';
    this.successMessage = '';

    //trim the inputs first
   const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    if (!username || !email || !password || !confirmPassword){
      this.errorMessage = 'All fields are required';
       return;
    }
    if (password !== confirmPassword){
      this.errorMessage = 'Passwords do not match';
      return;
    }
    // if (password.length < 6){
    //   this.errorMessage = 'Password must be at least 6 characters';
    //   return;
    // }
    if (!this.agreeTerms){
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }
    this.isLoading = true;
    this.authService.register(username,email, password, 'USER').subscribe({
      next: ()=>{
       this.successMessage='Registration successful, Please login';
       this.isLoading=false;
       setTimeout(() => {this.router.navigate(['/login']);
       }, 300);
      },
      error: (error) =>{
        console.error('Registration error:', error);
        this.errorMessage = error.error?.error ||'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  checkPswdStrength(password: string){
    const pswdError: string[]= [];
    let strength= 0;
    if(password.length >= 8) strength++;
    else pswdError.push("Password should be of atleast 8 characters");

    if(/[A-Z]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[a-z]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[0-9]/.test(password))  strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[@#$%&*!?]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    this.pswdStrength=strength;
    this.pswdErrors=pswdError;

  }

  onPswdChange(value: string): void{
    this.password= value;
    this.checkPswdStrength(value);
  }


}
