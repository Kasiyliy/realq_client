import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {SocketMessage} from '../../models/socket-message';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public stompClient: Stomp;

  private serverUrl = `${environment.apiUrl}socket`;
  private serverSendUrl = `/app/socket`;
  private serverListenUrl = `/thread/messages`;

  constructor(private toastrService: ToastrService) {

  }

  public sendMessage(socketMessage: SocketMessage) {
    this.stompClient.send(this.serverSendUrl, {},
      JSON.stringify(socketMessage));
  }

  public initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.serverListenUrl, (messageOutput) => {
        console.log(messageOutput.body);
        const message = JSON.parse(messageOutput.body);
        this.toastrService.info('Message: ' + message.content + '. Come from: ' + message.sender);
      }, err => {
        console.log(err);
      });
    });
  }

  public disconnect() {
    if (this.stompClient != null) {
      this.stompClient.ws.close();
    }
    console.log('Disconnected');
  }


}
