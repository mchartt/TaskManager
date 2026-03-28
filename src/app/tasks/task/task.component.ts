import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.model';


@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({required: true}) task !: Task;
  @Output() complete = new EventEmitter<string>();

  get daysLeftLabel() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const deadline = new Date(this.task.dueDate);
    deadline.setHours(0, 0, 0, 0);

    const dayInMs = 1000 * 60 * 60 * 24;
    const diff = Math.ceil((deadline.getTime() - now.getTime()) / dayInMs);

    if (Number.isNaN(diff)) {
      return 'Deadline non valida';
    }

    if (diff > 1) {
      return `${diff} giorni mancanti`;
    }

    if (diff === 1) {
      return '1 giorno mancante';
    }

    if (diff === 0) {
      return 'Scade oggi';
    }

    if (diff === -1) {
      return 'Scaduta da 1 giorno';
    }

    return `Scaduta da ${Math.abs(diff)} giorni`;
  }

  formatDate(dateValue: string) {
    return new Date(dateValue).toLocaleDateString('it-IT');
  }

  onCompleteTask() {
    this.complete.emit(this.task.id);
  }

}
