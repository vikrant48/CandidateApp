import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetails.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private API_URL = 'http://localhost:8081/api/users/user_details';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllUserDetails(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(this.API_URL, { headers: this.getAuthHeaders() });
  }

  getUserDetailById(id: number): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }

  createUserDetail(data: UserDetail): Observable<UserDetail> {
    return this.http.post<UserDetail>(this.API_URL, data, { headers: this.getAuthHeaders() });
  }

  updateUserDetail(id: number, data: UserDetail): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.API_URL}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  deleteUserDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }
}
