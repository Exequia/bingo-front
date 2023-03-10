import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private readonly websocket: WebsocketService) {}

  createNewGamePlayer(playerName: string) {
    this.websocket.createNewGamePlayer(playerName);
  }
}
