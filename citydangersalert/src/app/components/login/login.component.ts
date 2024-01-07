import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    localStorage.removeItem('jwtToken'); 
  }

  constructor(private router: Router,private authService: AuthenticationService) {}
  user = {
    email: '',
    password: '',
  };    

  toDashboard() {
    this.authService.authenticate(this.user).subscribe(
      (response) => {
        console.log('Authentication successful!');
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decoded = jwtDecode(token) as any; 
          const roles = decoded.roles;
      if (roles.includes('ADMIN')) { 
      this.router.navigate(['/admin-dashboard']);
      }
   else {
      this.router.navigate(['/dashboard']);
    }
  } 
      },
      (err) => {
        console.error('Authentication failed!');
      }
    );
  }

  toRegister(){
    this.router.navigate(['/register']);
  }
}

