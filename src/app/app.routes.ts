import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { SearchFlightsComponent } from './components/search-flights/search-flights';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'search-flights',component: SearchFlightsComponent }
];