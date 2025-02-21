import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserStatus } from '../../../models/enums/UserStatus';

@Component({
  selector: 'app-user-status-select',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Selecione um Status</mat-label>
      <mat-select [value]="selectedStatus" (selectionChange)="statusChanged($event.value)">
        <mat-option *ngFor="let status of userStatuses" [value]="status">
          {{ getStatusLabel(status) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: ['.full-width { width: 100%; }']
})
export class UserStatusSelectComponent {
  @Input() selectedStatus: UserStatus = UserStatus.Unknown;
  @Output() statusChange = new EventEmitter<UserStatus>();

  userStatuses = Object.values(UserStatus).filter(value => typeof value === 'number') as UserStatus[];

  getStatusLabel(status: UserStatus): string {
    return UserStatus[status]; // Converte enum numérico para string
  }

  statusChanged(value: UserStatus) {
    this.statusChange.emit(value);
  }
}
