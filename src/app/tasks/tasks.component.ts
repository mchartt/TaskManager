import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { Task } from './task/task.model';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})



export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name!: string;

  isAddingTask = false;
  today = new Date().toISOString().slice(0, 10);

  tasks = [

    {
      id: 't1',
      userId: 'u1',
      title: 'Completare modulo Angular',
      summary: 'Terminare le esercitazioni su componenti, input/output e template control flow.',
      createdAt: '2026-03-10',
      dueDate: '2026-04-05',
    }, 

    {
      id: 't2',
      userId: 'u1',
      title: 'Preparare presentazione sprint',
      summary: 'Raccogliere progressi principali e creare 5 slide di recap del lavoro svolto.',
      createdAt: '2026-03-12',
      dueDate: '2026-04-02',
    }, 

    {
      id: 't3',
      userId: 'u1',
      title: 'Refactor componente User',
      summary: 'Separare responsabilita e ripulire il markup del componente utente.',
      createdAt: '2026-03-14',
      dueDate: '2026-04-08',
    }, 
    
    {
      id: 't4',
      userId: 'u2',
      title: 'Aggiornare documentazione API',
      summary: 'Documentare endpoint e payload usati dal modulo tasks.',
      createdAt: '2026-03-11',
      dueDate: '2026-04-06',
    }, 
    
    {
      id: 't5',
      userId: 'u2',
      title: 'Configurare test componenti',
      summary: 'Aggiungere test base per TaskComponent e TasksComponent.',
      createdAt: '2026-03-15',
      dueDate: '2026-04-10',
    }, 

    {
      id: 't6',
      userId: 'u3',
      title: 'Review UX task board',
      summary: 'Verificare spaziature, leggibilita e usabilita del form di inserimento.',
      createdAt: '2026-03-13',
      dueDate: '2026-04-04',
    }
  ];

  private nextTaskId = 7;

  get selectedUserTasks() {
    return this.tasks.filter( (task) => task.userId === this.userId);
  }

  onCompleteTasks (id: string) {
    this.tasks = this.tasks.filter( (task) => task.id !== id); 
  }

  onAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onSubmitTask(title: string, summary: string, createdAt: string, dueDate: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    this.tasks = [
      ...this.tasks,
      {
        id: `t${this.nextTaskId++}`,
        userId: this.userId,
        title: trimmedTitle,
        summary: summary.trim() || 'No summary provided.',
        createdAt: createdAt.trim() || this.today,
        dueDate: dueDate.trim() || '2026-12-31',
      },
    ];

    this.isAddingTask = false;
  }


}
