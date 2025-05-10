import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toast-container',
  template: `
    <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3 z-3">
  <div *ngFor="let toast of toastService.toasts"
       class="toast align-items-center show text-white bg-{{ toast.type }} border-0 mb-2"
       role="alert">
    
    <div class="toast-body d-flex justify-content-between align-items-center">
      <span>{{ toast.text }}</span>
      <div class="d-flex align-items-center">
        <button *ngIf="toast.action"
                class="btn btn-sm btn-light ms-2"
                (click)="confirm(toast)">
          {{ toast.actionLabel || 'Confirmar' }}
        </button>
        <button type="button" class="btn-close btn-close-white ms-2"
                aria-label="Close"
                (click)="remove(toast)">
        </button>
      </div>
    </div>
    
  </div>
</div>
  `,
  imports: [CommonModule],
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) { }

  remove(toast: any) {
    const index = this.toastService.toasts.indexOf(toast);
    if (index !== -1) this.toastService.toasts.splice(index, 1);
  }

  confirm(toast: any) {
    if (toast.action) {
      toast.action();
      this.remove(toast);
    }
  }
}
