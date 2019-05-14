import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../services/tasks/tasks.service';
import {Tasks} from '../../models/tasks';
import {ToastrService} from 'ngx-toastr';
import {SocketService} from '../../services/socket/socket.service';
import {OnEventReceived} from '../../services/socket/on-event-received';
import {SocketMessage} from '../../models/socket-message';
import {MessageCode} from '../../models/enums/message-code.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnEventReceived, OnDestroy {

  public sendMessageForm: FormGroup;

  private serverUrl = `${environment.apiUrl}socket`;
  private stompClient: Stomp;
  private serverSendUrl = `/app/socket`;
  private serverListenUrl = `/thread/messages`;

  tasks: Tasks[] = [];

  constructor(private builder: FormBuilder,
              private taskService: TasksService,
              private translateService: TranslateService,
              private toastrService: ToastrService,
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
    const msgCode = (socketMessage.messageCode);
    if (socketMessage.worker !== null) {
      if (msgCode.valueOf() === MessageCode.TASK_TAKEN.valueOf()) {
        this.tasks.forEach((task) => {
          if (task.id === socketMessage.worker.task.id) {
            task.worker = socketMessage.worker;
            this.voice('Ожидающий с номером ' + task.id + ' идет к обслуживающему ' + task.worker.name );
          }
        });
        console.log('TASK_TAKEN!');

      } else if (msgCode.valueOf() === MessageCode.FINISHED.valueOf()) {
        this.tasks.forEach((task) => {
          if (task.id === socketMessage.task.id && socketMessage.task.completed) {
            this.tasks = this.tasks.filter(t => t.id !== task.id);
          }
        });
        console.log('FINISHED!');

      } else if (msgCode.valueOf() === MessageCode.TASK_ADDED.valueOf()) {
        this.tasks.push(socketMessage.addedTask);
        console.log('TASK ADDED!');
      } else if (msgCode.valueOf() === MessageCode.TASK_ADDED_TASK_TAKEN.valueOf()) {
        this.tasks.push(socketMessage.addedTask);

        this.tasks.forEach((task) => {
          if (task.id === socketMessage.worker.task.id) {
            task.worker = socketMessage.worker;
            this.voice('Ожидающий с номером ' + task.id + ' идет к обслуживающему ' + task.worker.name );
          }
        });
        console.log('TASK_ADDED_TASK_TAKEN!');
      }
    } else {
      if (msgCode.valueOf() === MessageCode.TASK_ADDED.valueOf()) {
        this.tasks.push(socketMessage.addedTask);
        console.log('TASK ADDED!');
      }
    }

  }

  voice(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
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
    this.taskService.getAllNullCompleted().subscribe(taskWithWorkers => {
      taskWithWorkers.forEach(taskWithWorker => {
        let task = new Tasks();
        task = taskWithWorker.task;
        task.worker = taskWithWorker.worker;
        this.tasks.push(task);
      });
    }, err => {

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });

      console.log(err);
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }


}
