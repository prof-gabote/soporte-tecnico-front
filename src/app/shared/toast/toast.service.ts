import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: { 
    text: string; 
    type: string; 
    action?: () => void; 
    actionLabel?: string; 
  }[] = [];

  show(text: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') {
    this.toasts.push({ text, type });
    setTimeout(() => this.toasts.shift(), 3000); // duración: 3s
  }

  showConfirm(text: string, onConfirm: () => void, type: string = 'warning') {
    this.toasts.push({
      text,
      type,
      action: onConfirm,
      actionLabel: 'Confirmar'
    });
  }

}
