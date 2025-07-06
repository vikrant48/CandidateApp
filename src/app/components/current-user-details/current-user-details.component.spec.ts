import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserDetailsComponent } from './current-user-details.component';

describe('CurrentUserDetailsComponent', () => {
  let component: CurrentUserDetailsComponent;
  let fixture: ComponentFixture<CurrentUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
