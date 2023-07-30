import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from "socket.io";


@WebSocketGateway(
 {
  cors: {
    origin: '*',
  },
 }
)
export class ChatGateway {
@WebSocketServer()
server:Server;

  @SubscribeMessage('newmessage')
  handleMessage(@MessageBody() data:string) {
   this.server.emit("message",{
    content:data
   })
  }
}
