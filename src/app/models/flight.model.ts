export interface SearchFlightRequest{
  source: string;
  destination: string;
  journeyDate: string;
  numberOfPassengers: number;
  roundTrip: boolean;
  returnDate?: string;
}

export interface FlightSearchResponse{
  onwardFlights: Flight[];
  returnFlights?: Flight[];
}

export interface Flight{
  flightId: string;
  airline: string;
  availableSeats: number;
  dateTime: string;  
  price: number;
  availableSeatNumbers: string[];
}

export interface AddFlightRequest{
  airlineName: string;
  source: string;
  destination: string;
  startDate: string;      
  endDate: string;       
  availableSeats: number;
  ticketPrice: number;
  mealStatus: boolean;
}

export interface AdminFlight{
  flightId: string;
  airline: string;
  source: string;
  destination: string;
  startDateTime: string;
  endDateTime: string;
  price: number;
  availableSeats:number;
}
