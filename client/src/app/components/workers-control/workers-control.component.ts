import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkersService} from '../../services/workers/workers.service';
import {Workers} from '../../models/workers';
import {ToastrService} from 'ngx-toastr';
import {SocketService} from '../../services/socket/socket.service';
import {SocketMessage} from '../../models/socket-message';

@Component({
  selector: 'app-workers-control',
  templateUrl: './workers-control.component.html',
  styleUrls: ['./workers-control.component.css']
})
export class WorkersControlComponent implements OnInit, OnDestroy {

  workers: Workers[];

  constructor(private workersService: WorkersService, private toastrService: ToastrService, private socketService: SocketService) {

  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection();

    this.getAll();
  }

  getAll() {
    this.workersService.getAll().subscribe(perf => {
      this.workers = perf;
    }, err => {
      console.log(err);
      this.toastrService.error('Error occured! Report to system administrator!');
    });
  }

  release(worker: Workers) {
    const socketMessage = new SocketMessage();
    socketMessage.content = 'I am released task' + worker.task.iin;
    socketMessage.sender = worker.login;
    this.socketService.sendMessage(socketMessage);
  }

  search(worker: Workers) {
    const socketMessage = new SocketMessage();
    socketMessage.content = 'I am searching for job  ' + worker.id;
    socketMessage.sender = worker.login;
    this.socketService.sendMessage(socketMessage);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
    console.log('Disconnected');
  }


}
