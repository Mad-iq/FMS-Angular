import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminFlight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-all-flights-admin',
  imports: [CommonModule, Navbar],
  templateUrl: './all-flights-admin.html',
  styleUrl: './all-flights-admin.css',
})
export class AllFlightsAdmin implements OnInit{
  flights: AdminFlight[]=[];
  error='';

  constructor(private flightService: FlightService){}

  ngOnInit(): void {
      this.loadFlights();
  }
  loadFlights():void{
    this.error='';
  this.flightService.getAllFlights().subscribe({
    next: (response)=>{
      this.flights=response;
    },
    error:()=>{
      this.error='Failed to load'
    }
  });
  }

}
