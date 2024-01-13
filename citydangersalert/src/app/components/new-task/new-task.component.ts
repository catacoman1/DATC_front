import { Component, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { Task } from '../../models/task.model';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @Input() latitude!: number;
  @Input() longitude!: number;
  selectedProblem!: string;
  task: Task = {
    id: 99,
    name: 'name',
    points: 10,
    latitude: 10,
    longitude: 10,
  };

  constructor(
    private http: HttpClient,
    public notificationService: NotificationsService,
    public userService: UserService,
    private authService: AuthenticationService 
  ) {}


  getPointsForProblem(problem: string): number {
    switch (problem) {
      case 'PanaCurent':
        return 100;
      case 'CopacCazut':
        return 200;
      case 'Inundatie':
        return 200;
      case 'Furtuna':
        return 200;
      case 'Cos Gunoi Rasturnat':
        return 10;
      case 'Alerta Urs':
        return 50;
      case 'Incendiu':
        return 300;
      default:
        return 0;
    }
  }

  onSubmit() {
    const points = this.getPointsForProblem(this.selectedProblem);  
    const body = {
      name: this.selectedProblem,
      latitude: this.latitude,
      longitude: this.longitude,
      points: points,
    };
    this.task.name = this.selectedProblem;
    this.task.latitude = this.latitude;
    this.task.longitude = this.longitude;
    this.task.points = points;
    this.notificationService.send(this.task);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });

    this.http.post('https://datcproiectdocker.azurewebsites.net/api/messages/send', body, { headers: headers, responseType: 'text' })
      .subscribe(
        (response) => {
          console.log(response);
         
          const currentUserEmail = this.authService.getCurrentUserEmail();
          if (currentUserEmail) {
         
            this.userService.getUserIDByEmail(currentUserEmail).subscribe(
              userId => {
             
                this.userService.addPointsToUser(userId, points).subscribe(
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
        },
        (error) => {
          console.error('Error submitting task:', error);
        }
      );
  }
}
