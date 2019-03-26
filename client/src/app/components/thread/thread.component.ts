import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import $ from 'jquery';
import {TasksService} from '../../services/tasks/tasks.service';
import {Tasks} from '../../models/tasks';
import {ToastrService} from 'ngx-toastr';
import {SocketService} from '../../services/socket/socket.service';
import {OnEventReceived} from '../../services/socket/on-event-received';
import {SocketMessage} from '../../models/socket-message';
import {MessageCode} from '../../models/enums/message-code.enum';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnEventReceived {

  public sendMessageForm: FormGroup;

  private serverUrl = `${environment.apiUrl}socket`;
  private stompClient: Stomp;
  private serverSendUrl = `/app/socket`;
  private serverListenUrl = `/thread/messages`;

  numbers: number[] = [1, 2, 3, 4, 5, 6];
  tasks: Tasks[] = [];

  constructor(private builder: FormBuilder, private taskService: TasksService, private toastrService: ToastrService,
              private socketService: SocketService) {
  }

  ngOnInit() {

    this.socketService.initializeWebSocketConnection(this);

    this.sendMessageForm = this.builder.group({
      message: [null, Validators.required],
      sender: [null, Validators.required],
    });

    this.getAll();
  }

  onEventReceived(socketMessage: SocketMessage): void {

    if (socketMessage.worker !== null) {
      const msgCode = (socketMessage.messageCode);

      if (msgCode.valueOf() === MessageCode.TASK_TAKEN.valueOf()) {
        this.tasks.forEach((task) => {
          if (task.id === socketMessage.worker.task.id) {
            task.worker = socketMessage.worker;
          }
        });

      } else if (msgCode.valueOf() === MessageCode.FINISHED.valueOf()) {
        this.tasks.forEach((task) => {
          if (task.id === socketMessage.task.id && socketMessage.task.completed) {
            this.tasks = this.tasks.filter(t => t.id !== task.id);
          }
        });

      } else if (msgCode.valueOf() === MessageCode.TASK_ADDED.valueOf()) {
        this.tasks.push(socketMessage.addedTask);
      } else if (msgCode.valueOf() === MessageCode.TASK_ADDED_TASK_TAKEN.valueOf()) {
        this.tasks.push(socketMessage.addedTask);

        this.tasks.forEach((task) => {
          if (task.id === socketMessage.worker.task.id) {
            task.worker = socketMessage.worker;
          }
        });
      }
    }

  }

  sendMessage() {
    const content = this.sendMessageForm.get('message').value;
    const sender = this.sendMessageForm.get('sender').value;
    const socketMessage = new SocketMessage();
    socketMessage.sender = sender;
    socketMessage.content = content;

    this.socketService.sendMessage(socketMessage);
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
