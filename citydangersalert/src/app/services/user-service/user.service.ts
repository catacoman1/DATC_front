import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'https://datcproiectdocker.azurewebsites.net/api/users';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${userId}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiServerUrl, user);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/all`);
  }
  public getUserPoints(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/${userId}/points`);
  }

  public getUserByPoints(userPoints: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${userPoints}`);
  }

  public addPointsToUser(userId: number, points: number): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/${userId}/addPoints`, points);
  }

  getCurrentUserEmail(): string | null {
    return this.authService.getCurrentUserEmail();
  }

  getUserIDByEmail(email: string): Observable<number> {
    return this.http.get<any>(`https://datcproiectdocker.azurewebsites.net/api/users/email/${email}`)
      .pipe(
        map(user => user.id)
      );
  }
}
