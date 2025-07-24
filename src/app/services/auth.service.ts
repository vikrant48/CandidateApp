import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import {
  LoginRequest,
  SignupRequest,
  JwtResponse,
  MessageResponse,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private currentUserSubject = new BehaviorSubject<JwtResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(private http: HttpClient) {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${this.apiUrl}/signin`, loginRequest)
      .pipe(
        tap((response) => {
          if (this.isBrowser) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            localStorage.setItem('token', response.token);
          }
          this.currentUserSubject.next(response);
        })
      );
  }

  register(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/signup`,
      signupRequest
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getCurrentUser(): JwtResponse | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser?.id ?? null;
  }

  // getCurrentUserRole(): string | null {
  //   const user = this.getCurrentUser();
  //   return user?.roles?.[0] ?? null;
  // }

  getCurrentUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.roles;
      return roles?.[0] ?? null;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getCurrentUserRole() === 'ROLE_ADMIN';
  }
}
