import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlightService } from '../../services/flight.service';
import { Flight, SearchFlightRequest } from '../../models/flight.model';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: './search-flights.html',
  styleUrls: ['./search-flights.css']
})
export class SearchFlightsComponent implements OnInit {
  username: string = '';
  today!: string;
  searchForm = {
    source: 'DELHI',
    destination: 'MUMBAI',
    departureDate: '2025-12-31',
    returnDate: '',
    numberOfPassengers: 1,
    roundTrip: false
  };
  
  flights: Flight[] = [];
  searched = false;
  isLoading = false;
  errorMessage = '';
  get isAuthenticated(): boolean {
  return this.authService.isAuthenticated();
}

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'User';
     const now = new Date();
     this.today = now.toISOString().split('T')[0];
  } 
  searchFlights() {
    this.errorMessage = '';
    
    if (!this.searchForm.source || !this.searchForm.destination || !this.searchForm.departureDate) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true;
    this.searched = true;
    this.flights = [];

    const searchRequest: SearchFlightRequest = {
      source: this.searchForm.source.trim().toUpperCase(),
      destination: this.searchForm.destination.trim().toUpperCase(),
      journeyDate: this.searchForm.departureDate,
      numberOfPassengers: this.searchForm.numberOfPassengers,
      roundTrip: this.searchForm.roundTrip,
      returnDate: this.searchForm.roundTrip ? this.searchForm.returnDate : undefined
    };

    this.flightService.searchFlights(searchRequest).subscribe({
      next: (flights) => {
        this.flights = flights;
        this.isLoading = false;
        if (this.flights.length === 0) {
          this.errorMessage = 'No flights found for your search criteria';
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to search flights. Please try again.';
        this.flights = [];
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  goToBooking(flightId: string){
  if(this.isAuthenticated){
    this.router.navigate(['/book-flight', flightId]);
  }else {
    this.router.navigate(['/login']);
  }
  }
}