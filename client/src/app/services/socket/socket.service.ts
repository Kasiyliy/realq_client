import {Injectable, OnDestroy} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {SocketMessage} from '../../models/socket-message';
import {ToastrService} from 'ngx-toastr';
import {OnEventReceived} from './on-event-received';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

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

  public initializeWebSocketConnection(onEventReceived: OnEventReceived) {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.serverListenUrl, (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        onEventReceived.onEventReceived(message);
      }, err => {
        console.log(err);
      });
    });
  }

  public initializeWebSocketConnectionWithoutEventSending() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.serverListenUrl, (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
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

  ngOnDestroy(): void {
    this.disconnect();
  }


}
