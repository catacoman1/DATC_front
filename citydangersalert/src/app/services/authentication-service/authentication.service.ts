import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationRequest } from '../../models/authentication_request';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(authRequest: AuthenticationRequest): Observable<any> {
    return this.http.post('https://citydangeralert.azurewebsites.net/api/v1/auth/authenticate', authRequest).pipe(
      map((response: any) => {
        if (response && response.token) {
         
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      })
    );
  }
}