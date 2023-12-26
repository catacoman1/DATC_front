import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  
  selectedProblem!: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Ensure you are sending the selectedProblem
    const body = { message: this.selectedProblem };

    // Set headers to expect a text response
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'text/plain' });

    this.http.post('https://citydangeralert.azurewebsites.net/api/messages/send', body, { headers: headers, responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        
      }, error => {
        console.error(error);
       
      });
  }
}
