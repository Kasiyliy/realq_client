import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkersService} from '../../services/workers/workers.service';
import {Workers} from '../../models/workers';
import {ToastrService} from 'ngx-toastr';
import {SocketService} from '../../services/socket/socket.service';
import {SocketMessage} from '../../models/socket-message';
import {MessageCode} from '../../models/enums/message-code.enum';
import {OnEventReceived} from '../../services/socket/on-event-received';

@Component({
  selector: 'app-workers-control',
  templateUrl: './workers-control.component.html',
  styleUrls: ['./workers-control.component.css']
})
export class WorkersControlComponent implements OnInit, OnDestroy, OnEventReceived {

  workers: Workers[];

  constructor(private workersService: WorkersService, private toastrService: ToastrService, private socketService: SocketService) {

  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(this);
    this.getAll();
  }

  onEventReceived(socketMessage: SocketMessage): void {

    if (socketMessage.worker !== null) {
      const msgCode = (socketMessage.messageCode);

      if (msgCode.valueOf() === MessageCode.TASK_TAKEN.valueOf()) {
        this.workers.forEach((worker) => {
          if (worker.id === socketMessage.worker.id) {
            worker.task = socketMessage.worker.task;
          }
        });

      } else if (msgCode.valueOf() === MessageCode.FINISHED.valueOf()) {
        this.workers.forEach((worker) => {
          if (worker.id === socketMessage.worker.id) {
            worker.task = null;
          }
        });
      } else if (msgCode.valueOf() === MessageCode.TASK_ADDED_TASK_TAKEN.valueOf()) {
        this.workers.forEach((worker) => {
          if (worker.id === socketMessage.worker.id) {
            worker.task = socketMessage.worker.task;
          }
        });
      }


      // this.workers.forEach((w) => {
      //   if (w.task != null) {
      //     this.search(w);
      //   }
      // });
    }
  }


  getAll() {
    this.workersService.getAllManagers().subscribe(perf => {
      this.workers = perf;
    }, err => {
      console.log(err);
      this.toastrService.error('Error occured! Report to system administrator!');
    });
  }

  releaseJobThenSearch(worker: Workers) {
    this.release(worker);
    setTimeout((e) => {
      if (worker.task === null) {
        this.search(worker);
      }
    }, 2000);
  }

  release(worker: Workers) {
    const socketMessage = new SocketMessage();
    socketMessage.content = 'I am released task' + worker.task.iin;
    socketMessage.sender = worker.login;
    socketMessage.messageCode = MessageCode.TASK_RELEASED;
    this.socketService.sendMessage(socketMessage);
  }

  search(worker: Workers) {
    const socketMessage = new SocketMessage();
    socketMessage.content = 'I am searching for job  ' + worker.id;
    socketMessage.sender = worker.login;
    socketMessage.messageCode = MessageCode.DO_SEARCH;
    this.socketService.sendMessage(socketMessage);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }


}
