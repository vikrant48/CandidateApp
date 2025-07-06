import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UserDetailsService } from '../../services/user-details.service';
import { FieldConfigService, FieldConfig } from '../../config_services/userdetails-field-config.service';
import { UserDetail } from '../../models/userDetails.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailComponent implements OnInit {
  userDetailsForm: FormGroup = new FormGroup({});
  fieldConfig: FieldConfig[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';
  isEditing = false;
  currentUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService,
    private configService: FieldConfigService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configService.config$.subscribe(config => {
      this.fieldConfig = config;
      this.buildForm();
      this.loadCurrentUserDetail();
    });
  }

  buildForm(): void {
    const group: { [key: string]: any } = {};

    this.fieldConfig.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);

      switch (field.key) {
        case 'email':
          validators.push(Validators.email, Validators.maxLength(120));
          break;
        case 'mobileNumber':
          validators.push(Validators.maxLength(10));
          break;
        case 'panNumber':
          validators.push(Validators.maxLength(10));
          break;
        case 'aadhaarNumber':
          validators.push(Validators.maxLength(12));
          break;
        case 'resumePath':
          validators.push(Validators.maxLength(255));
          break;
      }

      group[field.key] = this.fb.control({ value: '', disabled: !field.editable }, validators);
    });

    this.userDetailsForm = this.fb.group(group);
  }

  loadCurrentUserDetail(): void {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      console.warn('No logged-in user ID found.');
      return;
    }

    this.userDetailsService.getUserDetailById(userId).subscribe({
      next: (user: UserDetail) => {
        this.userDetailsForm.patchValue(user);
        this.currentUserId = user.id!;
        this.isEditing = true;
      },
      error: () => {
        console.log('No user detail found. Switching to create mode.');
        this.isEditing = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userDetailsForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.userDetailsForm.getRawValue();

    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key] === null) {
        delete formData[key];
      }
    });

    const request$ = this.isEditing && this.currentUserId
      ? this.userDetailsService.updateUserDetail(this.currentUserId, formData)
      : this.userDetailsService.createUserDetail(formData);

    request$.subscribe({
      next: () => {
        this.successMessage = this.isEditing
          ? 'User details updated successfully!'
          : 'User details saved successfully!';
        this.loading = false;
        this.isEditing = true;
        this.router.navigate(['/my-details']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Something went wrong.';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.loadCurrentUserDetail();
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = false;
    this.router.navigate(['/my-details']);
  }
}
