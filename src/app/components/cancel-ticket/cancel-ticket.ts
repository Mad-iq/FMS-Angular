import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-cancel-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-ticket.html',
  styleUrl: './cancel-ticket.css',
})
export class CancelTicket {
 pnr!: string;
 message='';

 constructor( private bookingService: BookingService){}

 cancelTicket(): void{
  this.bookingService.cancelBookingByPnr(this.pnr).subscribe({
    next: (response: any) =>{
          this.message = response?.message || "Ticket cancelled successfully";
    },
    error: (error)=>{
      this.message=error.error?.message|| "Falied to cancel ticket";
    }
  })
 }

}
