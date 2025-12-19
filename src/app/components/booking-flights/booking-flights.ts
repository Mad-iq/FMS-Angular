import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingRequest } from '../../models/booking.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking-flight',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-flights.html',
  styleUrl: './booking-flights.css',
})
export class BookingFlightComponent implements OnInit {
flightId!: string;
error='';
successMessage='';
pnr='';

booking= {
  userName: '',
  userEmail: '',
  numberOfSeats: 1,
  mealType: 'VEG',
  passengers: [] as any[]
};

constructor(
  private bookingService: BookingService,
  private route: ActivatedRoute,  //gives you information about the currently active route
  private router: Router
){} 

ngOnInit(): void {
    this.flightId= this.route.snapshot.paramMap.get('flightId')!;
    this.onSeatCountChange(this.booking.numberOfSeats);
}

onSeatCountChange(seats: number) {
  if(!seats || seats<1)
    return;
  this.booking.passengers=Array.from({length: seats}, ()=>({
    name:'',
    age:18,
    gender:'',
    seatNumber:''
  }));
}

  bookFlight(): void{
    this.error='';
    this.successMessage='';
    const bookingRequest: BookingRequest={
      email: this.booking.userEmail,
      name:this.booking.userName,
      numberOfSeats: this.booking.numberOfSeats,
      mealPreference: this.booking.mealType,
      seatNumbers: this.booking.passengers.map(passenger=>passenger.seatNumber),
      passengers:this.booking.passengers.map(passenger=>({
        name: passenger.name,
        gender: passenger.gender,
        age: passenger.age
      }))
    };

    this.bookingService.bookFlight(this.flightId, bookingRequest).subscribe({
      next: (response: any)=>{
        if(response?.message && response.message.toLowerCase().includes('unavailable')){
          this.error=response.message;
          this.successMessage='';
        }else{
          this.successMessage='Bookingcompleted successfully!';
          this.error='';
        }

        if(response?.pnr){
          this.pnr=response.pnr;
        }
      },

        error: (error)=>{
          this.error= error.error?.message || 'Booking not successful';
          this.successMessage='';
        }
    });

  }

   goToBookingDetails(){
    if(this.pnr){
       this.router.navigate(['/booking-details',this.pnr]);
    } 
  }
}



