import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { TaskServiceService } from '../../services/task-service/task-service.service';
import { Task } from '../../models/task.model';
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
  tasksWithin100Meters: Task[] = [];

  private map: any;
  private markers: any[] = [];

  @ViewChild('mapContainer') private mapContainer!: ElementRef;

  constructor(
    public notificationService: NotificationsService,
    private taskService: TaskServiceService
  ) { }

  ngOnInit(): void {



    this.notificationService.connect();
    this.notificationService.responseSubject.subscribe((task: Task) => {
      this.tasks.push(task);
      this.filterTasksWithin100Meters();
      this.addMarkers();
    });

    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.initializeMap();

      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );

    this.watchPosition();
    this.decodeToken();
  }

  initializeMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.createMap(coords.latitude, coords.longitude);
        this.filterTasksWithin100Meters();
      });
    } else {
      console.log('Location is not supported');
    }
  }

  createMap(latitude: number, longitude: number): void {
    this.map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
    L.marker([latitude, longitude]).addTo(this.map);

    this.markers = [];
    this.addMarkers();

  }

  addMarkers() {
    this.tasks.forEach((task) => {
      if (typeof task.latitude === 'number' && typeof task.longitude === 'number') {

        const circleMarker = L.circle([task.latitude, task.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 50
        }).addTo(this.map);

        circleMarker.bindPopup(task.name);
        this.markers.push({ task, marker: circleMarker });
      }
    });
  }
  focusOnTask(task: Task): void {
    const associatedMarker = this.markers.find(m => m.task === task)?.marker;
    if (associatedMarker) {
      this.map.setView(associatedMarker.getLatLng(), 13);
      associatedMarker.openPopup();
      this.scrollToMap();
    }
  }

  private scrollToMap(): void {
    const elementRect = this.mapContainer.nativeElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 3);
    window.scrollTo({ top: middle, behavior: 'smooth' });
  }


  filterTasksWithin100Meters(): void {
    const latitudeDegreeDistance = 0.0009;
    const longitudeDegreeDistance = 0.0009 / Math.cos(this.latitude * (Math.PI / 180));

    this.tasksWithin100Meters = this.tasks.filter(task => {
      const latDistance = Math.abs(this.latitude - task.latitude);
      const lonDistance = Math.abs(this.longitude - task.longitude);

      return latDistance <= latitudeDegreeDistance && lonDistance <= longitudeDegreeDistance;
    });
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

    this.notificationService.disconnect();
    this.showNewTaskComponent = !this.showNewTaskComponent;

  }
  onTaskDeleted(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.filterTasksWithin100Meters();
    this.removeMarkerForTask(taskId);
  }
  private removeMarkerForTask(taskId: number): void {
    const markerIndex = this.markers.findIndex(m => m.task.id === taskId);
    if (markerIndex > -1) {
      this.map.removeLayer(this.markers[markerIndex].marker);
      this.markers.splice(markerIndex, 1);
    }
  }



}
