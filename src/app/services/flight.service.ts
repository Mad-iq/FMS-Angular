import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchFlightRequest, Flight, AddFlightRequest, AdminFlight } from '../models/flight.model';

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
        return response?.onwardFlights || response || [];  //the backend responses may vary
      }),
      catchError(error => throwError(() => error))
    );
  }

  getFlightInfo(flightId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory/${flightId}`);
  }

  addFlight(request: AddFlightRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getAllFlights(): Observable<AdminFlight[]>{
    return this.http.get<AdminFlight[]>(`${this.apiUrl}/all`);
  }
}