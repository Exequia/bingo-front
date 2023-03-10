import { Injectable } from '@angular/core';
import { GamePlayersService } from '@app/services/gamePlayers/game-players.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';
import { addGamePlayer, deleteGamePlayer } from '../entities/game-player.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class GamePlayersEffects {
  constructor(private readonly actions$: Actions, private readonly gamePlayersService: GamePlayersService) {}

  addGamePlayer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addGamePlayer),
        exhaustMap(payload => {
          const { gamePlayer } = payload;
          this.gamePlayersService.addPlayer(gamePlayer);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  disconnectGamePlayer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteGamePlayer),
        exhaustMap(payload => {
          const { id } = payload;
          this.gamePlayersService.disconnectPlayer(id);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
}
