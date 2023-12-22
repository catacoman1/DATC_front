import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
}
