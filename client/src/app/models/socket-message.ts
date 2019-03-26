import {Workers} from './workers';
import {MessageCode} from './enums/message-code.enum';
import {Tasks} from './tasks';

export class SocketMessage {
  sender: string;
  content: string;
  messageCode: MessageCode;
  worker: Workers;
  task: Tasks;
  addedTask: Tasks;
}
