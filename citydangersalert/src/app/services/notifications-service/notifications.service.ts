import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/task.model';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  stompClient: any;
  topic: string = "/topic/tasks";
  responseSubject = new Subject<Task>();
  public msg: any[] = [];
  webSocketEndPoint: string = 'https://citydangeralert.azurewebsites.net/socket/notification';

  isConnected: boolean = false;

  constructor() { }

  connect() {
    console.log("Conexiune WebSocket initializata");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.isConnected = true;
      console.log(frame);
      _this.stompClient.subscribe(_this.topic, function (taskResponse: any) {
        _this.onMessageReceived(taskResponse);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log("Disconnected");
  }

  errorCallBack(error: any) {
    this.isConnected = false;
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  send(message: Task) {
    console.log("Calling API via web socket");
    this.stompClient.send("/app/task", {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    console.log("Message received: ", message.body);
    const task: Task = JSON.parse(message.body);
    this.responseSubject.next(task);
  }
  getNotifications(): Observable<Task> {
    return this.responseSubject.asObservable();
  }
}
