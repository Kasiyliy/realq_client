import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Jobs} from '../../../models/jobs';
import {Tasks} from '../../../models/tasks';
import {SocketMessage} from '../../../models/socket-message';
import {MessageCode} from '../../../models/enums/message-code.enum';
import {TasksService} from '../../../services/tasks/tasks.service';
import {SocketService} from '../../../services/socket/socket.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-enter-iin',
  templateUrl: './enter-iin.component.html',
  styleUrls: ['./enter-iin.component.css']
})
export class EnterIINComponent implements OnInit, OnDestroy {


  iinSelectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EnterIINComponent>,
              @Inject(MAT_DIALOG_DATA) public job: Jobs,
              private translateService: TranslateService,
              private taskService: TasksService,
              private socketService: SocketService,
              private toastrService: ToastrService,
              private builder: FormBuilder,
              ) { }

  ngOnInit() {
    this.iinSelectForm = this.builder.group({
      iin: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
    });
    this.socketService.initializeWebSocketConnectionWithoutEventSending();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    if ( this.iinSelectForm.valid) {
      const task = new Tasks();
      task.iin = this.iinSelectForm.get('iin').value;
      task.job = this.job;
      this.taskService.save(task).subscribe(resp => {

        this.translateService.get('Your number is')
          .subscribe(perf => {
            this.toastrService.success(perf + ' ' + resp.id);
          });
        const message = new SocketMessage();
        message.task = resp;
        message.messageCode = MessageCode.TASK_ADDED;
        message.content = 'New task added to queue!';
        message.sender = 'anonymous';
        this.socketService.sendMessage(message);
        this.dialogRef.close();
      });
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
