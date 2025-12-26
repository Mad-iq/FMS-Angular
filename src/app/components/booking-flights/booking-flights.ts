import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingRequest } from '../../models/booking.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-booking-flight',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: './booking-flights.html',
  styleUrl: './booking-flights.css',
})
export class BookingFlightComponent implements OnInit {
flightId!: string;
error='';
pnr='';
seats: { seatNumber: string; booked: boolean}[]= [];
selectedSeats: string[]= [];

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
  private router: Router,
  private authService: AuthService
){} 

ngOnInit(): void {
    this.flightId= this.route.snapshot.paramMap.get('flightId')!;
    const email = this.authService.getUserEmail();
    const username = this.authService.getUsername();
    this.loadSeatMap();
     if (!email || !username) {
    this.error = 'User information missing. Please login again.';
    return;
  }

  this.booking.userEmail = email;
  this.booking.userName = username;
  this.onSeatCountChange(this.booking.numberOfSeats);
}

onSeatCountChange(seats: number) {
  if(!seats || seats<1)
     return;
    this.selectedSeats = [];
  this.booking.passengers=Array.from({length: seats}, ()=>({ //array.from creates an array of size seats, sec arg is the mapper func
    name:'',
    age:null as any, //shows the placeholder values
    gender:'',
    seatNumber:''
  }));
}
  bookFlight(): void{
    this.error='';
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
        if(response?.pnr){
           this.router.navigate(['/booking-details', response.pnr],{
            state:{totalPrice: response.totalPrice}
           });
        }else{
          this.error='All inputs required';
        }
      },
        error: (error)=>{
          this.error= error.error?.message ||'Booking not successful';
        }
    });
  }

  loadSeatMap() {
  this.bookingService.getFlightInventory(this.flightId).subscribe({
    next: (response) =>{
      const availableSeats = new Set(response.availableSeatNumbers);
      const allSeats: string[] =[];
      let row =1;
      let letter ='A';
      const totalSeats =response.totalSeats;
      for (let i = 0; i < totalSeats; i++){
        const seat = `${row}${letter}`;
        allSeats.push(seat);
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);//this moves the seat letter forward charcode gives ascii and fromcharcode gives back the letter
        if (letter >'F'){
          letter ='A';
          row++;
        }
      }
      this.seats =allSeats.map(seat =>({
        seatNumber: seat,
        booked: !availableSeats.has(seat) //saving each seat with its status
      }));
    },
    error:() =>{
      this.error ='Failed to load seat availability';
    }
  });
}

toggleSeat(seat: any) {  //clicking a seat should unselect it and selected seats to be assigned automat to passengers
  if (seat.booked) return;
  if (this.selectedSeats.includes(seat.seatNumber)) {
    this.selectedSeats = this.selectedSeats.filter(
      s =>s !== seat.seatNumber); //if I click an already selected seat, remove it
  } else {
    if (this.selectedSeats.length>= this.booking.numberOfSeats) {
      return;
    }
    this.selectedSeats.push(seat.seatNumber);
  }
  this.booking.passengers.forEach((p, index) =>{
    p.seatNumber = this.selectedSeats[index] || '';
   });
}

isSelected(seat: any): boolean{ //for html
  return this.selectedSeats.includes(seat.seatNumber);
}

//to disable the booking button till all req setas are not selected
canBook():boolean{
  return this.selectedSeats.length === this.booking.numberOfSeats;
}


}



