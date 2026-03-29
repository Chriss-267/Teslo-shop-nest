import { WebSocketGateway, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesWsService: MessagesWsService) { }

  handleConnection(client: Socket, ...args: any[]) {
    this.messagesWsService.registerClient(client);
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
  }


}
