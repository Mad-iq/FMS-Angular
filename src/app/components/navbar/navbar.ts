import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 constructor(private authService: AuthService,private router: Router){}

  get isAuthenticated():boolean{
    return this.authService.isAuthenticated();
  }
  get isAdmin():boolean{
    return this.authService.getUserRole() === 'ADMIN';
  }

  logout(): void{
    this.authService.logout();
  }
  viewBookings(): void{
    this.router.navigate(['/booking-history']);
  }
  cancelBookings(): void{
    this.router.navigate(['/cancel-ticket']);
  }
}
