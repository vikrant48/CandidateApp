import { Component } from '@angular/core';
import { FieldConfig, FieldConfigService } from '../../config_services/register-field-config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register-field-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-field-config.component.html',
  styleUrl: './register-field-config.component.css',
})
export class RegisterFieldConfigComponent {
  fieldConfigs: FieldConfig[] = [];

  constructor(private configService: FieldConfigService) {
    this.fieldConfigs = [...this.configService.getCurrentConfig()];
  }

  saveChanges() {
    this.configService.updateConfig(this.fieldConfigs);
    alert('Field configuration updated!');
  }
}
