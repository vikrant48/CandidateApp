// components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserResponse | null = null;
  profileForm: FormGroup;
  loading = true;
  updating = false;
  editMode = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      name: ['', Validators.maxLength(100)],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      mobileNumber: ['', Validators.maxLength(15)],
      role : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  enterEditMode(): void {
    if (this.user) {
      this.profileForm.patchValue({
        username: this.user.username,
        name: this.user.name,
        mobileNumber: this.user.mobileNumber,
        role: this.user.role,
        email: this.user.email
      });
      this.editMode = true;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.profileForm.reset();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.updating = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = { ...this.profileForm.value };
      
      // Remove empty fields
      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null) {
          delete formData[key];
        }
      });

      this.userService.updateProfile(formData).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.successMessage = 'Profile updated successfully!';
          this.updating = false;
          setTimeout(() => {
            this.editMode = false;
            this.successMessage = '';
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update profile';
          this.updating = false;
        }
      });
    }
  }
}