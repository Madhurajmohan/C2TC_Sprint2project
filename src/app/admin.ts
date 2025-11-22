import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/admins';   // BASE PATH FROM CONTROLLER

  // Create a new Admin
  createAdmin(adminData: any): Observable<any> {
    return this.http.post(this.API, adminData);
  }

  // Get all Admins
  getAdmins(): Observable<any> {
    return this.http.get(this.API);
  }

  // Delete Admin by ID
  deleteAdmin(adminId: number): Observable<any> {
    return this.http.delete(`${this.API}/${adminId}`);
  }

  // Update Admin (if needed)
  updateAdmin(adminData: any): Observable<any> {
    return this.http.put(`${this.API}/${adminData.id}`, adminData);
  }

  // Get Admin by ID (optional)
  getAdminById(adminId: number): Observable<any> {
    return this.http.get(`${this.API}/${adminId}`);
  }
}
