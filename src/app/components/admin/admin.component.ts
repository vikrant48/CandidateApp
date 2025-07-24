import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';
import { UserAdminView } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: UserAdminView[] = [];
  errorMessage = '';
  loading = true;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        this.errorMessage = 'Unable to fetch users.';
        this.loading = false;
      },
    });
  }

  activate(userId: number): void {
    this.adminService.activateUser(userId).subscribe({
      next: () => this.loadUsers(),
      error: (err) => {
        console.error('Activation failed:', err);
        this.errorMessage = 'Failed to activate user.';
      },
    });
  }

  deactivate(userId: number): void {
    this.adminService.deactivateUser(userId).subscribe({
      next: () => this.loadUsers(),
      error: (err) => {
        console.error('Deactivation failed:', err);
        this.errorMessage = 'Failed to deactivate user.';
      },
    });
  }

  // viewDetails(user: UserAdminView): void {
  //   alert(
  //     `Name: ${user.userDetail?.firstName} ${user.userDetail?.lastName}
  //     Username: ${user.user.username}
  //     Email: ${user.user.email}
  //     Alternate Mobile: ${user.userDetail?.alternateMobileNumber}
  //     Mobile: ${user.userDetail?.mobileNumber}
  //     PAN: ${user.userDetail?.panNumber}
  //     Aadhaar: ${user.userDetail?.aadhaarNumber}
  //     DOB: ${user.userDetail?.dob}
  //     Gender: ${user.userDetail?.gender}
  //     Blood Group: ${user.userDetail?.bloodGroup}
  //     Age: ${user.userDetail?.age}
  //     Address: ${user.userDetail?.address}
  //     Country: ${user.userDetail?.country}
  //     Emergency Contact: ${user.userDetail?.emergencyContactName} (${user.userDetail?.emergencyContactRelation}) - ${user.userDetail?.emergencyContactNumber}`
  //   );
  // }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']); // Update with your actual route
  }
}
