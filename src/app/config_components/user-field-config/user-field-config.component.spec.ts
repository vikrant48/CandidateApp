import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFieldConfigComponent } from './user-field-config.component';

describe('UserFieldConfigComponent', () => {
  let component: UserFieldConfigComponent;
  let fixture: ComponentFixture<UserFieldConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFieldConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFieldConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
