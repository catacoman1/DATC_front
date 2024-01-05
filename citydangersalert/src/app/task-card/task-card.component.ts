import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.taskDeleted.emit(taskId);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
