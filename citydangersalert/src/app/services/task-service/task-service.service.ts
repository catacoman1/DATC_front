import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private apiUrl = 'https://citydangeralert.azurewebsites.net/api/tasks'; 

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/all');
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}