import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  
  @Input() latitude!: number;
  @Input() longitude!: number;
  selectedProblem!: string;

  constructor(private http: HttpClient) {}


  getPointsForProblem(problem: string): number {
    switch(problem) {
      case 'PanaCurent': return 300;
      case 'CopacCazut': return 200;
      case 'Inundatie': return 200;
      case 'Furtuna': return 200;
      default: return 0;
    }
  }

  onSubmit() {

    const points = this.getPointsForProblem(this.selectedProblem);
    
    const body = {
      name: this.selectedProblem,
      latitude: this.latitude,
      longitude: this.longitude,
      points: points
    };

   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'text/plain' });

    this.http.post('https://citydangeralert.azurewebsites.net/api/messages/send', body, { headers: headers, responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        
      }, error => {
        console.error(error);
       
      });
  }
}
