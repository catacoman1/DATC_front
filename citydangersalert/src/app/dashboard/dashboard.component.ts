import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { NotificationsService } from '../services/notifications.service';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../models/task.model';
declare const L: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  latitude!: number;
  longitude!: number;
  showNewTaskComponent = false;
  constructor(
    private notificationService: NotificationsService,
    private taskService: TaskServiceService
  ) {}
  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;

        // Ensure map initialization and task processing are done here
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const coords = position.coords;
            this.latitude = coords.latitude;
            this.longitude = coords.longitude;

            let map = L.map('map').setView(
              [coords.latitude, coords.longitude],
              13
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors',
            }).addTo(map);
            L.marker([coords.latitude, coords.longitude]).addTo(map);

            this.tasks.forEach((task, index) => {
              if (
                typeof task.latitude === 'number' &&
                typeof task.longitude === 'number'
              ) {
                const offset = 0.00005 * index;
                var circle = L.circle(
                  [task.latitude + offset, task.longitude + offset],
                  {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 50,
                  }
                ).addTo(map);

                circle.bindPopup(task.name);
              }
            });
          });
        } else {
          console.log('Location is not supported');
        }

        this.notificationService.connect();

        this.notificationService.onMessageRecived;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );

    this.watchPosition();
    this.decodeToken();
  }

  watchPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          'latitudine ' +
            position.coords.latitude +
            'longitudine' +
            position.coords.longitude
        );
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
  decodeToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Decoded JWT:', decoded);
      const email = decoded.sub;
      console.log('Email from JWT:', email);
      const decodedrole = jwtDecode(token) as any;
      console.log('rol' + decodedrole.roles);
    }
  }
  toggleNewTaskComponent(): void {
    this.showNewTaskComponent = !this.showNewTaskComponent;
  }
}
