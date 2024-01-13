import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationRequest } from '../../models/authentication_request';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(authRequest: AuthenticationRequest): Observable<any> {
    return this.http.post('https://datcproiectdocker.azurewebsites.net/api/v1/auth/authenticate', authRequest).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      })
    );
  }

  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode.jwtDecode<any>(token); 
      return decodedToken.sub; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
