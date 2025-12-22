import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { SearchFlightsComponent } from './components/search-flights/search-flights';
import { HomeComponent } from './components/home/home';
import { BookingFlightComponent } from './components/booking-flights/booking-flights';
import { BookingDetails } from './components/booking-details/booking-details';
import { BookingHistory } from './components/booking-history/booking-history';
import { FlightInventory } from './components/flight-inventory/flight-inventory';
import { Profile } from './components/profile/profile';


export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'search-flights',component: SearchFlightsComponent },
  { path: 'book-flight/:flightId', component: BookingFlightComponent },
  { path: 'booking-details/:pnr', component: BookingDetails},
  { path: 'booking-history', component: BookingHistory},
  { path: 'flight-inventory', component: FlightInventory },
  { path: 'profile', component: Profile }

];