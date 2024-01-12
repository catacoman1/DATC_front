import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskServiceService } from '../../services/task-service/task-service.service';
import { UserService } from 'src/app/services/user-service/user.service'; 
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service'; 

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();

  constructor(
    private taskService: TaskServiceService,
    private userService: UserService, 
    private authService: AuthenticationService 
  ) {}

  ngOnInit(): void {
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.addPointsForSolvingTask();
        this.taskDeleted.emit(taskId);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }

  addPointsForSolvingTask(): void {
    const currentUserEmail = this.authService.getCurrentUserEmail();
    if (currentUserEmail) {
      this.userService.getUserIDByEmail(currentUserEmail).subscribe(
        userId => {
          this.userService.addPointsToUser(userId, this.task.points).subscribe(
            updatedUser => {
              console.log('Points added:', updatedUser);
            },
            error => {
              console.error('Error adding points:', error);
            }
          );
        },
        error => {
          console.error('Error retrieving user ID:', error);
        }
      );
    } else {
      console.error('User email not found in token');
    }
  }
}
