export interface Passenger {
  name: string;
  gender: string;
  age: number;
}

export interface BookingRequest {
  email: string;
  name: string;
  numberOfSeats: number;
  passengers: Passenger[];
  mealPreference: string;
  seatNumbers: string[];
}

export interface BookingHistoryItem {
  pnr: string;
  numberOfPassengers: number;
  totalPrice: number;
  journeyDate: string;
  status: 'CONFIRMED' | 'CANCELLED';
  cancelling?: boolean;
}
