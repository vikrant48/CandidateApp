import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFieldConfigComponent } from './register-field-config.component';

describe('RegisterFieldConfigComponent', () => {
  let component: RegisterFieldConfigComponent;
  let fixture: ComponentFixture<RegisterFieldConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFieldConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFieldConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
