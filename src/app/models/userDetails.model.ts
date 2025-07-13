export interface UserDetail {
  id?: number;
  firstName: string;
  lastName: string;

  // From User entity
  email?: string;
  mobileNumber?: string;

  dob: string; // ISO format (e.g., "2000-01-01")
  age?: number;
  address?: string;
  isActive?: boolean;
  panNumber?: string;
  aadhaarNumber?: string;
  alternateEmail?: string;
  alternateMobileNumber?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactRelation?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  country?: string;
}

