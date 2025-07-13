import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'date' | 'select';
  required: boolean;
  editable: boolean;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class FieldConfigService {
  private defaultConfig: FieldConfig[] = [
    // Primary Name & Contact
    { key: 'firstName',                label: 'First Name',                type: 'text',     required: true,  editable: true,  visible: true },
    { key: 'lastName',                 label: 'Last Name',                 type: 'text',     required: true,  editable: true,  visible: true },
    { key: 'email',                    label: 'Email',                     type: 'email',    required: false,  editable: false, visible: true },
    { key: 'mobileNumber',             label: 'Mobile Number',             type: 'tel',      required: false,  editable: false, visible: true },

    // Additional Contacts
    { key: 'alternateEmail',           label: 'Alternate Email',           type: 'email',    required: false, editable: true,  visible: true },
    { key: 'alternateMobileNumber',    label: 'Alternate Mobile Number',   type: 'tel',      required: false, editable: true,  visible: true },

    // Personal Information
    { key: 'dob',                      label: 'Date of Birth',             type: 'date',     required: true,  editable: true,  visible: true },
    { key: 'gender',                   label: 'Gender',                    type: 'select',   required: true,  editable: true,  visible: true },
    { key: 'bloodGroup',               label: 'Blood Group',               type: 'select',   required: false, editable: true,  visible: true },
    { key: 'address',                  label: 'Address',                   type: 'text',     required: true,  editable: true,  visible: true },
    { key: 'panNumber',                label: 'PAN Number',                type: 'text',     required: true,  editable: true,  visible: true },
    { key: 'aadhaarNumber',            label: 'Aadhaar Number',            type: 'text',     required: true,  editable: true,  visible: true },

    // Emergency Contact
    { key: 'emergencyContactName',     label: 'Emergency Contact Name',    type: 'text',     required: false, editable: true,  visible: true },
    { key: 'emergencyContactNumber',   label: 'Emergency Contact Number',  type: 'tel',      required: false, editable: true,  visible: true },
    { key: 'emergencyContactRelation', label: 'Relation with Emergency Contact', type: 'text', required: false, editable: true, visible: true },

    // Optional
    { key: 'country',                  label: 'Country',                   type: 'text',     required: false, editable: true,  visible: true }
  ];

  private configSubject = new BehaviorSubject<FieldConfig[]>(this.defaultConfig);
  config$ = this.configSubject.asObservable();

  updateConfig(newConfig: FieldConfig[]) {
    this.configSubject.next(newConfig);
  }

  getCurrentConfig(): FieldConfig[] {
    return this.configSubject.getValue();
  }
}
