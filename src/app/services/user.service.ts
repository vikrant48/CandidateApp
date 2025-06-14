// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/profile`);
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/all`);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  updateProfile(user: Partial<User>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/profile`, user);
  }
}