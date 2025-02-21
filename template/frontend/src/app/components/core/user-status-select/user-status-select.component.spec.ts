import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusSelectComponent } from './user-status-select.component';

describe('UserStatusSelectComponent', () => {
  let component: UserStatusSelectComponent;
  let fixture: ComponentFixture<UserStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
