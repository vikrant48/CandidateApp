import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserDetailsService } from '../../services/user-details.service';
import { AuthService } from '../../services/auth.service';
import { UserDetail } from '../../models/userDetails.model';

@Component({
  selector: 'current-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './current-user-details.component.html',
  styleUrl: './current-user-details.component.css'
})
export class CurrentUserDetailsComponent implements OnInit {
  userDetail: UserDetail | null = null;
  errorMessage = '';
  loading = true;

  constructor(
    private userDetailsService: UserDetailsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.userDetailsService.getUserDetailById(userId).subscribe({
        next: (data) => {
          this.userDetail = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load user detail:', err);
          this.errorMessage = 'Failed to load your details.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'User ID not found. Please log in again.';
      this.loading = false;
    }
  }

  printPage(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // reloads the full app back after printing
    }
  }


  edit(): void {
    this.router.navigate(['/userdetails']);
  }

  delete(): void {
    if (!this.userDetail?.id) return;

    const confirmDelete = confirm('Are you sure you want to delete your details?');
    if (confirmDelete) {
      this.userDetailsService.deleteUserDetail(this.userDetail.id).subscribe({
        next: () => {
          alert('Your details were deleted.');
          this.userDetail = null;
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.errorMessage = 'Failed to delete your details.';
        }
      });
    }
  }
}
