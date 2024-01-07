import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistrationRequest } from '../../models/registration_request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
  register(regRequest: RegistrationRequest): Observable<any> {
    return this.http.post('https://citydangeralert.azurewebsites.net/api/v1/auth/register', regRequest).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
