import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css']
})
export class BookingDetails implements OnInit {
  pnr!: string;
  booking: any;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,private bookingService: BookingService) {}

  ngOnInit(): void {
    this.pnr = this.route.snapshot.paramMap.get('pnr')!;
    this.fetchBooking();
  }
  fetchBooking(): void {
    this.bookingService.getBookingByPNR(this.pnr).subscribe({
      next: (response: any) => {
        this.booking = response;
        this.loading = false;
      },
      error: () => {
      this.error = 'Booking not found';
       this.loading = false;
      }
    });
  }
}
