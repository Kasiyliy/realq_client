import {Tasks} from './tasks';
import {Jobs} from './jobs';

export class Workers {
  id: number;
  name: string;
  login: string;
  password: string;
  task: Tasks;
  jobs: Jobs[];
}
