import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications-service/notifications.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDropdownVisible = false;
  unreadNotifications = 0; 
  userPoints =0;

  constructor(private router: Router, private notificationsService: NotificationsService, private userService: UserService){}

  ngOnInit(): void {
    this.listenToNotifications();
    this.loadUserPoints();
  }
  loadUserPoints(): void {
    const currentUserEmail = this.userService.getCurrentUserEmail();
    if (currentUserEmail) {
      this.userService.getUserIDByEmail(currentUserEmail).subscribe(
        userId => {
          // Replace getUserPoints with the correct method name if different
          this.userService.getUserPoints(userId).subscribe(
            points => {
              this.userPoints = points;
            },
            error => console.error('Error fetching user points:', error)
          );
        },
        error => console.error('Error retrieving user ID:', error)
      );
    }
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
