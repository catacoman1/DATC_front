import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDropdownVisible = false;
  unreadNotifications = 0; 

  constructor(private router: Router, private notificationsService: NotificationsService){}

  ngOnInit(): void {
    this.listenToNotifications();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  signOut() {
    localStorage.removeItem('jwtToken'); 
    this.router.navigate(['/login']);
    this.toggleDropdown(); 
  }

  listenToNotifications(): void {
    this.notificationsService.getNotifications().subscribe(notification => {
      this.unreadNotifications++; 
    });
  }

  toggleNotifications(): void {

    this.unreadNotifications = 0; 
  }
}
