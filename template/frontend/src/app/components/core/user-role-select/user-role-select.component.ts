import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRole } from '../../../models/enums/UserRole';

@Component({
  selector: 'app-user-role-select',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Selecione um Papel</mat-label>
      <mat-select [value]="selectedRole" (selectionChange)="roleChanged($event.value)">
        <mat-option *ngFor="let role of userRoles" [value]="role">
          {{ getRoleLabel(role) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: ['.full-width { width: 100%; }']
})
export class UserRoleSelectComponent {
  @Input() selectedRole: UserRole = UserRole.None;
  @Output() roleChange = new EventEmitter<UserRole>();

  userRoles = Object.values(UserRole).filter(value => typeof value === 'number') as UserRole[];

  getRoleLabel(role: UserRole): string {
    return UserRole[role];
  }

  roleChanged(value: UserRole) {
    this.roleChange.emit(value);
  }
}
