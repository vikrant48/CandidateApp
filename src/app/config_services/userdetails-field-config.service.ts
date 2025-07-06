import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FieldConfig {
  key: string;
  label: string;
  type: string;
  required: boolean;
  editable: boolean;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class FieldConfigService {
  private defaultConfig: FieldConfig[] = [
    { key: 'firstName', label: 'First Name', type: 'text', required: true, editable: true, visible: true },
    { key: 'lastName', label: 'Last Name', type: 'text', required: true, editable: true, visible: true },
    { key: 'email', label: 'Email', type: 'email', required: true, editable: true, visible: true },
    { key: 'mobileNumber', label: 'Mobile Number', type: 'tel', required: true, editable: true, visible: true },
    { key: 'dob', label: 'Date of Birth', type: 'text', required: true, editable: true, visible: true },
    { key: 'address', label: 'Address', type: 'text', required: true, editable: true, visible: true },
    { key: 'panNumber', label: 'PAN Number', type: 'text', required: true, editable: true, visible: true },
    { key: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true, editable: true, visible: true },
    { key: 'resumePath', label: 'Resume Path', type: 'text', required: false, editable: true, visible: true }
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
