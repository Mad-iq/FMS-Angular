import { Component } from '@angular/core';
import { AddFlightRequest } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-inventory.html',
  styleUrl: './flight-inventory.css',
})
export class FlightInventory{
  successMessage= '';
  errorMessage= '';
  isLoading= false;
  flight: AddFlightRequest= {
    airlineName: '',
    source: '',
    destination: '',
    startDate: '',
    endDate: '',
    availableSeats: 0,
    ticketPrice: 0,
    mealStatus: false
  };

  constructor(private flightService: FlightService) {}

  addFlight(): void {
    this.successMessage = '';
    this.errorMessage = '';
    const airlineName = this.flight.airlineName.trim();
    const source = this.flight.source.trim();
    const destination = this.flight.destination.trim();
    const startDate = this.flight.startDate;
    const endDate = this.flight.endDate;

    if ( !airlineName|| !source|| !destination|| !startDate|| !endDate|| this.flight.availableSeats <= 0 || this.flight.ticketPrice <= 0) 
    {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }
    this.isLoading = true;
    this.flightService.addFlight(this.flight).subscribe({
      next: (res) => {
        this.successMessage = res?.message || 'Flight added successfully';
        this.isLoading = false;
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'You are not authorized to add flights';
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
