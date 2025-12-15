export interface SearchFlightRequest {
  source: string;
  destination: string;
  journeyDate: string;
  numberOfPassengers: number;
  roundTrip: boolean;
  returnDate?: string;
}

export interface Flight {
  flightId: string;
  airline: string;
  availableSeats: number;
  dateTime: string;  
  price: number;
  availableSeatNumbers: string[];
}
