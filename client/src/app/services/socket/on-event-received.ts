import {SocketMessage} from '../../models/socket-message';

export interface OnEventReceived {


  onEventReceived(socketMessage: SocketMessage): void;

}
