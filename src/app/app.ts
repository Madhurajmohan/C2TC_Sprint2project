import { Component, signal, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected readonly title = signal('adminservice');

  adminDetails: any[] = [];

  adminToUpdate = {
    id: null as any,
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    department: '',
    activeStatus: 'Active'
  };

  constructor(private adminService: AdminService) {
    this.getAdminDetails();
  }

  // Create Admin
  registerAdmin(registerForm: NgForm) {
    this.adminService.createAdmin(registerForm.value).subscribe(
      () => {
        registerForm.reset();
        this.getAdminDetails();
      },
      (err) => console.error(err)
    );
  }

  // Get All Admins
  getAdminDetails() {
    this.adminService.getAdmins().subscribe(
      (resp) => this.adminDetails = resp,
      (err) => console.error(err)
    );
  }

  // Delete Admin
  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).subscribe(
      () => this.getAdminDetails(),
      (err) => console.error(err)
    );
  }

  // Edit Admin (Load values into form)
  edit(admin: any) {
    this.adminToUpdate = { ...admin };
  }

  // Update Admin
  updateAdmin() {
    this.adminService.updateAdmin(this.adminToUpdate).subscribe(
      () => {
        this.getAdminDetails();
        this.adminToUpdate = {
          id: null,
          name: '',
          email: '',
          password: '',
          role: '',
          phoneNumber: '',
          department: '',
          activeStatus: 'Active'
        };
      },
      (err) => console.error(err)
    );
  }
}
