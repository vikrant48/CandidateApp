import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetails.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private API_URL = 'http://localhost:8081/api/user_details';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getCurrentUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  /** Get all user details (admin) */
  getAllUserDetails(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(this.API_URL, { headers: this.getAuthHeaders() });
  }

  getUserDetailById(id: number): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }

  createUserDetail(data: UserDetail): Observable<UserDetail> {
    const userId = this.getCurrentUserIdFromToken();
    if (userId === null) throw new Error('User ID not found in token');

    return this.http.post<UserDetail>(`${this.API_URL}/${userId}`, data, { headers: this.getAuthHeaders() });
  }

  updateUserDetail(id: number, data: UserDetail): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.API_URL}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  deleteUserDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }
}
