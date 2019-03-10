import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  private serverUrl = `${environment.apiUrl}socket`;
  private stompClient;
  private sendMessageForm: FormGroup;
  private serverSendUrl = `/app/socket`;
  private serverListenUrl = `/thread/messages`;
  constructor(private builder: FormBuilder) {
  }

  ngOnInit() {


    this.sendMessageForm = this.builder.group({
      message: [null, Validators.required],
      sender: [null, Validators.required],
    });

    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.serverListenUrl, (messageOutput) => {
        console.log(messageOutput.body);
      }, err => {
        console.log(err);
      });
    });
  }

  sendMessage() {
    const content = this.sendMessageForm.get('message').value;
    const sender = this.sendMessageForm.get('sender').value;
    this.stompClient.send(this.serverSendUrl, {},
      JSON.stringify({ sender, content}));
  }

}
