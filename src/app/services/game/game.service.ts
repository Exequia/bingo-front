import { Injectable } from '@angular/core';
import { GameConfig, GameStatusEnum, GiftResponse, PlayerBase, ShoppingRequest } from '@app/models';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private readonly websocket: WebsocketService) { }

  setGameStatusInit() {
    this.websocket.setGameStatus(GameStatusEnum.initialized);
  }

  initConfigurationGame(gameConfig: GameConfig) {
    this.websocket.initConfigurationGame(gameConfig);
  }

  shoppingRound(dashboardAmount: number, player: PlayerBase) {
    const shoppingRequest: ShoppingRequest = {
      playerId: player?.id!,
      dashboardAmount}
    this.websocket.shoppingRound(shoppingRequest);
  }
}
