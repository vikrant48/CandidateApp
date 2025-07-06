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

  constructor(
    private userDetailsService: UserDetailsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userDetailsService.getUserDetailById(userId).subscribe({
        next: (data) => this.userDetail = data,
        error: () => this.errorMessage = 'Failed to load your details.'
      });
    }
  }

  edit(): void {
    this.router.navigate(['/userdetails']); // assumes your edit form route is /user-detail
  }

  delete(): void {
    const confirmDelete = confirm('Are you sure you want to delete your details?');
    if (confirmDelete && this.userDetail?.id) {
      this.userDetailsService.deleteUserDetail(this.userDetail.id).subscribe({
        next: () => {
          this.userDetail = null;
          alert('Your details were deleted.');
        },
        error: () => {
          this.errorMessage = 'Failed to delete your details.';
        }
      });
    }
  }
}
