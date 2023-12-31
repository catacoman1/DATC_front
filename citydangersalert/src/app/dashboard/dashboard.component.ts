import { Component, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
declare const L: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  

  showNewTaskComponent = false;

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      console.log(
        'latitudine ' +
          position.coords.latitude +
          'longitudine' +
          position.coords.longitude
      );
      let map = L.map('map').setView([coords.latitude, coords.longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);
    });

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
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
  decodeToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token) ;
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


