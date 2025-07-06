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
    { key: 'username', label: 'Username', type: 'text', required: true, editable: true, visible: true },
    { key: 'name', label: 'Full Name', type: 'text', required: true, editable: true, visible: true },
    { key: 'email', label: 'Email', type: 'email', required: true, editable: true, visible: true },
    { key: 'password', label: 'Password', type: 'password', required: true, editable: true, visible: true },
    { key: 'role', label: 'Role', type: 'select_role', required: true, editable: true, visible: true },
    { key: 'age', label: 'Age', type: 'number', required: false, editable: true, visible: true },
    { key: 'mobileNumber', label: 'Mobile Number', type: 'tel', required: false, editable: true, visible: true },
    { key: 'country', label: 'Country', type: 'text', required: false, editable: true, visible: true },
    { key: 'gender', label: 'Gender', type: 'select_gender', required: false, editable: true, visible: true }
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
