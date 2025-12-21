import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookingService } from '../../services/booking.service';
import { BookingHistoryItem } from '../../models/booking.model';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory {
  email = 'debashritamandal852@gmail.com';
  errormsg = '';
  history: BookingHistoryItem[] = [];
  loading = false;
 selectedTicket!: BookingHistoryItem;
  showConfirmDialog = false;
  
  showMessageDialog = false;
  msgTitle = '';
  msgText = '';
  msgType: 'success' | 'error' = 'success';

  constructor(private bookingService: BookingService) {}
  getHistory(): void {

    if (!this.email) {
      this.errormsg = 'Please enter a valid email';
      return;
    }

    this.errormsg = '';
    this.loading = true;
    this.bookingService.getBookingWithDetails(this.email).subscribe({
      next: (response: any) => {
        this.history = response.bookings || [];
        this.loading = false;
        if (this.history.length === 0) {
          this.errormsg = 'No bookings found for this email';
        }
      },
       error: (error) => {
        this.errormsg = error?.error?.message || 'Unable to fetch booking history';
        this.loading = false;
      }
    });
  }

  openCancelDialog(booking: BookingHistoryItem): void {
    this.selectedTicket = booking;
    this.showConfirmDialog = true;
  }

  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
  }
  confirmCancel(): void {
    if (!this.selectedTicket) return;
    this.selectedTicket.cancelling = true;
    this.bookingService.cancelBookingByPnr(this.selectedTicket.pnr).subscribe({
        next: (response: any) => {
          this.selectedTicket.status = 'CANCELLED';
          this.selectedTicket.cancelling = false;
          this.openMessageDialog('Success', response?.message || 'Ticket cancelled successfully','success');
          this.closeConfirmDialog();
        },
        error: (error) => {
          this.selectedTicket.cancelling = false;
          this.openMessageDialog('Action Not Allowed',error?.error?.message || 'Cancellation failed','error');

          this.closeConfirmDialog();
        }
      });
  }
  openMessageDialog(
    title: string,
    message: string,
    type: 'success' | 'error'
  ): void {
    this.msgTitle = title;
    this.msgText = message;
    this.msgType = type;
    this.showMessageDialog = true;
  }
  closeMessageDialog(): void {
    this.showMessageDialog = false;
  }
}
