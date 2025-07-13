// // components/register/register.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { Gender } from '../../models/user.model';
// import { FieldConfigService, FieldConfig } from '../../config_services/register-field-config.service';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   registerForm: FormGroup = new FormGroup({});
//   fieldConfig: FieldConfig[] = [];
//   loading = false;
//   errorMessage = '';
//   successMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private configService: FieldConfigService
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.maxLength(50)]],
//       name: ['', [Validators.required, Validators.maxLength(100)]],
//       email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
//       password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]],
//       age: [''],
//       mobileNumber: ['', Validators.maxLength(15)],
//       country: ['', Validators.maxLength(50)],
//       gender: ['']
//     });
//   }

//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       this.loading = true;
//       this.errorMessage = '';
//       this.successMessage = '';
      
//       const formData = { ...this.registerForm.value };
      
//       // Remove empty fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] === '' || formData[key] === null) {
//           delete formData[key];
//         }
//       });

//       this.authService.register(formData).subscribe({
//         next: (response) => {
//           this.successMessage = response.message;
//           this.loading = false;
//           setTimeout(() => {
//             this.router.navigate(['/login']);
//           }, 2000);
//         },
//         error: (error) => {
//           console.error('Registration error:', error);
//           this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
//           this.loading = false;
//         }
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FieldConfigService, FieldConfig } from '../../config_services/register-field-config.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  fieldConfig: FieldConfig[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private configService: FieldConfigService
  ) {}

  ngOnInit(): void {
    this.configService.config$.subscribe(config => {
      this.fieldConfig = config;
      this.buildForm();
    });
  }

  buildForm() {
    this.registerForm = this.fb.group({});

    this.fieldConfig.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);

      switch (field.key) {
        case 'username':
          validators.push(Validators.maxLength(50));
          break;
        case 'name':
          validators.push(Validators.maxLength(100));
          break;
        case 'email':
          validators.push(Validators.email, Validators.maxLength(120));
          break;
        case 'password':
          validators.push(Validators.minLength(6), Validators.maxLength(120));
          break;
        case 'mobileNumber':
          validators.push(Validators.maxLength(15));
          break;
        case 'role':
          validators.push(Validators.required);
      }

      this.registerForm.addControl(
        field.key,
        this.fb.control({ value: '', disabled: !field.editable }, validators)
      );
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = { ...this.registerForm.getRawValue() };

      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null) {
          delete formData[key];
        }
      });

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}
