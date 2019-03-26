import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../../models/categories';
import {CategoryService} from '../../services/categories/category.service';
import {ToastrService} from 'ngx-toastr';
import {Jobs} from '../../models/jobs';
import {JobService} from '../../services/jobs/job.service';
import {Tasks} from '../../models/tasks';
import {TasksService} from '../../services/tasks/tasks.service';
import {SocketService} from '../../services/socket/socket.service';
import {SocketMessage} from '../../models/socket-message';
import {MessageCode} from '../../models/enums/message-code.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  categories: Categories[];
  jobs: Jobs[];

  constructor(private builder: FormBuilder, private categoryService: CategoryService,
              private toastrService: ToastrService, private jobService: JobService,
              private taskService: TasksService, private socketService: SocketService) {
  }

  iinSelectForm: FormGroup;
  jobSelectForm: FormGroup;

  ngOnInit() {
    this.iinSelectForm = this.builder.group({
      iin: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
    });

    this.jobSelectForm = this.builder.group({
      category: ['', Validators.required],
      job: ['', Validators.required]
    });

    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to site administrator!');
    });

    this.socketService.initializeWebSocketConnectionWithoutEventSending();
  }

  getJobsBy(category: Categories) {
    this.jobService.getAllBy(category).subscribe(resp => {
      this.jobs = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to system administrator');
    });
  }

  getJobs() {
    this.jobService.getAll().subscribe(resp => {
      this.jobs = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to system administrator');
    });
  }

  submitForm() {
    if (this.jobSelectForm.valid && this.iinSelectForm.valid) {
      const task = new Tasks();
      task.iin = this.iinSelectForm.get('iin').value;
      task.job = this.jobSelectForm.get('job').value;
      this.taskService.save(task).subscribe(resp => {
        this.toastrService.success('Your number is ' + resp.id);
        const message = new SocketMessage();
        message.task = resp;
        message.messageCode = MessageCode.TASK_ADDED;
        message.content = 'New task added to queue!';
        message.sender = 'anonymous';
        this.socketService.sendMessage(message);
      });
    } else {
      this.toastrService.error('Error in form! Please rewrite form again!');
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }



}
