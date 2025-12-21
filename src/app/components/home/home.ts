import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  get isAuthenticated(): boolean {
  return this.authService.isAuthenticated();
  }

  features = [
    {
      icon: '✈️', 
      title: 'Search Flights',
      description: 'Find the best flight deals from hundreds of airlines worldwide'
    },
    {
      icon: '💳',
      title: 'Easy Booking',
      description: 'Simple and secure booking process in just a few clicks'
    },
    {
      icon: '🎫',
      title: 'Manage Bookings',
      description: 'View, modify, or cancel your bookings anytime, anywhere'
    },
    {
      icon: '🔔',
      title: 'Instant Notifications',
      description: 'Get real-time updates about your bookings via email'
    }
  ];


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  navigateToSearch() {
    if (this.isAuthenticated) {
      this.router.navigate(['/search-flights']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }

  viewBookings(){
    this.router.navigate(['/booking-history']);
  }

  cancelBookings(){
    this.router.navigate(['cancel-ticket']);
  }
}