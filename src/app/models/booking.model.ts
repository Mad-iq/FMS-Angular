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
