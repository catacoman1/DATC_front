import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../models/user"
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'https://citydangeralert.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {

  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${userId}`);
  }
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiServerUrl, user);

  }
  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/all`);
}
public getUserByPoints(userPoints: number): Observable<User> {
  return this.http.get<User>(`${this.apiServerUrl}/${userPoints}`);
}
}
