import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../services/user-service/user.service";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (usersData: User[]) => {
        this.users = usersData.sort((a, b) => a.orderIndex - b.orderIndex);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
