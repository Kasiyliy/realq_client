import {Jobs} from './jobs';
import {Workers} from './workers';

export class Tasks {
  id: number;
  iin: string;
  job: Jobs;
  completed: boolean;
  worker: Workers;
}
