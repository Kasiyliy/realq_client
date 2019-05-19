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
  breakpoint: number;
  tasks: Tasks[] = [];

  constructor(private builder: FormBuilder,
              private taskService: TasksService,
              private translateService: TranslateService,
              private toastrService: ToastrService,
              private socketService: SocketService) {
  }

  ngOnInit() {

    this.resize(window.innerWidth);

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
            this.voiceAdapter(task.id, task.worker.name);
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
            this.voiceAdapter(task.id, task.worker.name);
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

  voiceAdapter(id, name) {
    this.toastrService.info(this.translateService.defaultLang);
    this.voice('Ожидающий с номером ' + id + ' идет к обслуживающему ' + name, false);
  }

  voice(text, isEn) {
    const msg = new SpeechSynthesisUtterance(text);
    if (isEn) {
      msg.lang = 'en-US';
    } else {
      msg.lang = 'ru-RU';
    }
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

  resize(width) {
    if (width < 400) {
      this.breakpoint = 1;
    } else if (width >= 400 && width < 600) {
      this.breakpoint = 2;
    } else if (width >= 600 && width < 800) {
      this.breakpoint = 3;
    } else if (width >= 800 && width < 1000) {
      this.breakpoint = 4;
    } else if (width >= 1000 && width < 1200) {
      this.breakpoint = 5;
    } else {
      this.breakpoint = 6;
    }
  }

  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }


}
