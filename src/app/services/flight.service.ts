import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchFlightRequest, Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = `${environment.apiUrl}/FLIGHT-MICROSERVICE/api/flight`;

  constructor(private http: HttpClient) {}

  searchFlights(searchRequest: SearchFlightRequest): Observable<Flight[]> {
    return this.http.post<any>(`${this.apiUrl}/search`, searchRequest).pipe(
      timeout(30000),
      map(response => {
        return response?.onwardFlights || response || [];
      }),
      catchError(error => throwError(() => error))
    );
  }

  getFlightInfo(flightId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory/${flightId}`);
  }
}