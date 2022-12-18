import { RouterState } from '@ngrx/router-store';
import { ConfigState } from './configState';
import { GameState } from './gameState';
import { PlayerState } from './playerState';

export interface AppState {
  config: ConfigState;
  game: GameState;
  player: PlayerState;
  router: RouterState;
}
