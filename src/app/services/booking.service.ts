import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}

  bookFlight(flightId: string, bookingRequest: BookingRequest): Observable<any> {
    return this.http.post(
      `http://localhost:8765/BOOKING-MICROSERVICE/api/flight/booking/${flightId}`,
      bookingRequest
    );
  }

  getBookingByPNR(pnr: string) {
  return this.http.get(
    `http://localhost:8765/BOOKING-MICROSERVICE/api/flight/ticket/${pnr}`
  );
}

getBookingsByEmail(email: string) {
  return this.http.get(
    `http://localhost:8765/BOOKING-MICROSERVICE/api/flight/booking/history/${email}`
  );
}

cancelBookingByPnr(pnr: string){
  return this.http.delete(
    `http://localhost:8765/BOOKING-MICROSERVICE/api/flight/booking/cancel/${pnr}`
  );
}

//for new api
getBookingWithDetails(email: string) {
  return this.http.get<any>(
    `http://localhost:8765/BOOKING-MICROSERVICE/api/flight/booking/history/details/${email}`
  );
}
}
