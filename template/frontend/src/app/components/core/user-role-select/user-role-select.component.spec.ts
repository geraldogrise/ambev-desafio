import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleSelectComponent } from './user-role-select.component';

describe('UserRoleSelectComponent', () => {
  let component: UserRoleSelectComponent;
  let fixture: ComponentFixture<UserRoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
