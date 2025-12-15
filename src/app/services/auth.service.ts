import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userRoleKey = 'user_role';
  private usernameKey = 'username';
 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  register(username: string, password: string, role: string = 'USER'): Observable<AuthResponse> {
    const body: RegisterRequest = { username, password, role };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, body);
  }


  login(username: string, password: string): Observable<AuthResponse> {
    const body: LoginRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, body).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.setUsername(username);
          if (response.role) {
            this.setUserRole(response.role);
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.usernameKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }


  setUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role);
  }


  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }


  setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }


  isAuthenticated(): boolean {
    return this.hasToken();
  }


  private hasToken(): boolean {
    return !!this.getToken();
  }
}
