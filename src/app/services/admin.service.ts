import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAdminView, MessageResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserAdminView[]> {
    return this.http.get<UserAdminView[]>(`${this.baseUrl}/all`);
  }

  activateUser(id: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/user/${id}/activate`, {});
  }

  deactivateUser(id: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/user/${id}/deactivate`, {});
  }
}
