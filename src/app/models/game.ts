import { AbstractControl } from '@angular/forms';

export enum GameStatus {
  pending,
  initialized,
  started,
  finished,
}

export interface GameConfig {
  velocity: GameVelocity;
}

export interface GameConfigForm {
  velocity: AbstractControl<GameVelocity | null>;
}

export interface GameData {
  round: GameRound;
  history: GameRound[];
}

export enum GameVelocity {
  slow,
  standard,
  high,
}

export interface GameRound {
  roundNumber: number;
  results: GameResults;
}

export interface GameResults {
  playerIdLineWinner: number;
  playerIdRoundWinner: number;
}
