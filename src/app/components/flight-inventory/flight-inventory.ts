import { Component } from '@angular/core';
import { AddFlightRequest } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-flight-inventory',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './flight-inventory.html',
  styleUrl: './flight-inventory.css',
})
export class FlightInventory{
   get isAuthenticated(): boolean {
  return this.authService.isAuthenticated();
  }
  successMessage= '';
  errorMessage= '';
  isLoading= false;
  flight: AddFlightRequest= {
    airlineName: '',
    source: '',
    destination: '',
    startDate: '',
    endDate: '',
    availableSeats: null as any, //want to show the palceholder values not 0
    ticketPrice: null as any,
    mealStatus: false
  };
  today = new Date().toISOString().slice(0, 16);
  airports:string[] = [
    'DELHI',
    'MUMBAI',
    'BENGALURU',
    'PUNE',
    'CHENNAI',
    'HYDERABAD',
    'KOLKATA'
  ];

  constructor(private flightService: FlightService, private authService: AuthService) {}
  addFlight(): void {
    this.successMessage = '';
    this.errorMessage = '';
    const airlineName = this.flight.airlineName.trim();
    const source = this.flight.source.trim();
    const destination = this.flight.destination.trim();
    const startDate = this.flight.startDate;
    const endDate = this.flight.endDate;

    if ( !airlineName|| !source||!destination|| !startDate|| !endDate|| this.flight.availableSeats<= 0 || this.flight.ticketPrice<= 0) 
    {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }
    if(source === destination){
      this.errorMessage='Source and Destination cannot be same';
    }
    if(this.flight.endDate<= this.flight.startDate){
      this.errorMessage='End date must be after start date';
    }
    this.flight.airlineName= airlineName;
    this.flight.source= source;
    this.flight.destination= destination;
    this.isLoading =true;
    this.flightService.addFlight(this.flight).subscribe({
      next: (response) => {
        this.successMessage = response?.message || 'Flight added successfully';
        this.isLoading = false;
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'You are not authorized to add flights';
        this.isLoading = false;
      }
    });
  }

  private resetForm(): void {
    this.flight = {
      airlineName: '',
      source: '',
      destination: '',
      startDate: '',
      endDate: '',
      availableSeats: 0,
      ticketPrice: 0,
      mealStatus: false
    };
  }
}
