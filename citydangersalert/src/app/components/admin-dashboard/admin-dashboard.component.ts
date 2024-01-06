import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskServiceService } from '../../services/task-service/task-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }
  deleteTask(taskId: number): void {
   
    this.taskService.deleteTask(taskId).subscribe(
      () => {

        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
