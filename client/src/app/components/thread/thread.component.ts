import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import $ from 'jquery';
import {TasksService} from '../../services/tasks/tasks.service';
import {Tasks} from '../../models/tasks';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  public sendMessageForm: FormGroup;

  private serverUrl = `${environment.apiUrl}socket`;
  private stompClient;
  private serverSendUrl = `/app/socket`;
  private serverListenUrl = `/thread/messages`;

  numbers: number[] = [1, 2, 3, 4, 5, 6];
  tasks: Tasks[] = [];

  constructor(private builder: FormBuilder, private taskService: TasksService, private toastrService: ToastrService) {
  }

  ngOnInit() {


    this.sendMessageForm = this.builder.group({
      message: [null, Validators.required],
      sender: [null, Validators.required],
    });

    this.initializeWebSocketConnection();
    this.getAll();
  }

  initializeWebSocketConnection() {
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

  sendMessage() {
    const content = this.sendMessageForm.get('message').value;
    const sender = this.sendMessageForm.get('sender').value;
    this.stompClient.send(this.serverSendUrl, {},
      JSON.stringify({sender, content}));
  }

  getAll() {
    this.taskService.getAllAscWithLimitSix().subscribe(perf => {
      this.tasks = perf;
    }, err => {
      this.toastrService.error('Error occured! Report to system administrator!');
      console.log(err);
    });
  }

}
