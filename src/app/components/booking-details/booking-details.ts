import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule,Navbar],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css']
})
export class BookingDetails implements OnInit {
  pnr!: string; //! means pnr will be assigned before use
  booking: any;
  loading = true;
  error = '';
  totalPrice?:number;

  constructor(
    private route: ActivatedRoute,private bookingService: BookingService){}
  
  ngOnInit(): void{      //runs when the component is initialized
    const navigationState = history.state;  //get the browser history
    this.totalPrice = navigationState?.totalPrice;
    this.pnr = this.route.snapshot.paramMap.get('pnr')!;
    this.fetchBooking();
  }
  fetchBooking(): void{
    this.bookingService.getBookingByPNR(this.pnr).subscribe({
      next:(response: any) =>{
        this.booking = response;
        this.loading = false;
      },
      error:() =>{
      this.error = 'Booking not found';
       this.loading = false;
      }
    });
  }
}
