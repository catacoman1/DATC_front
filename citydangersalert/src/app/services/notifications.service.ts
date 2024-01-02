import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  stompClient: any
  topic: string = "/topic/tasks";
  responseSubject = new Subject<Task>();
  public msg = [];
  webSocketEndPoint: string = 'http://localhost:9090/socket/notification';
  constructor() { }
  connect() {
    console.log("Conexiune WebSocket initializata");
    let ws = SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (taskResponse: any) {
        _this.onMessageRecived(taskResponse);
      });
    }, this.errorCallBack);
  };
  connect2() {

    var socket = new SockJS('http://localhost:9090/socket/notification');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log(frame);
      _this.stompClient.subscribe('/all/messages', function (result: any) {
        _this.onMessageRecived(result);
      });
    })
  }
  disconect() {
    if (this.stompClient !== null) {
      this.stompClient.disconect();
    }
    console.log("Disconected");
  }
  errorCallBack(error: any) {
    console.log("errorCallBack ->" + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  send(message: Task) {
    console.log("Calling API via web socket");
    this.stompClient.send("/app/task", {}, JSON.stringify(message));
  }

  onMessageRecived(message: any) {
    console.log("Mesaj primit : " + message.body);
    const obj = JSON.parse(message.body) as Task
    this.responseSubject.next(obj);
  }
}
