import { Injectable } from '@angular/core';
import { URL_BINGO, URL_GAME, URL_READY, URL_SHOPPING } from '@app/config';
import { BalanceType, Dashboard, GamePlayerStatus, GameStatusEnum, GiftResponseType } from '@app/models';
import { GameService } from '@app/services/game/game.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isEqual } from 'lodash';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import {
  addCredit,
  changePlayerStatus,
  initConfigurationGame,
  initGameConfigSuccess,
  manageGameGift,
  saveGameGift,
  saveLocalPlayer,
  setGameConfig,
  setGameRoundData,
  setGameStatus,
  setGameStatusInit,
  setPlayerOwner,
  setRoundDashboards,
  shoppingRound,
  shoppingRoundSuccess,
  updateGameRoundData,
  updateGameStatus,
  updatePlayerDashboards
} from '../actions';
import { PlayerFacade } from '../facades/playerFacade';
import { RouterFacade } from '../facades/routerFacade';
import { UtilsService } from '@app/services/utils/utils.service';
import { GameFacade } from '../facades/gameFacade';

@Injectable()
export class GameEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly playerFacade: PlayerFacade,
    private readonly gameFacade: GameFacade,
    private readonly gameService: GameService,
    private readonly routerFacade: RouterFacade,
    private readonly utilsService: UtilsService
  ) {}

  manageGameGift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageGameGift),
      exhaustMap(payload => {
        const responseActions = [];
        switch (payload.gift?.type) {
          case GiftResponseType.credit:
            if (isEqual(payload.gift?.balanceType, BalanceType.Add)) {
              responseActions.push(addCredit({ credit: payload.gift?.balance }));
            }
            break;

          default:
            break;
        }
        responseActions.push(saveGameGift({ gift: undefined }));
        return responseActions;
      })
    )
  );

  setGameStatusInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setGameStatusInit),
      map(() => {
        this.gameService.setGameStatusInit();
        return setPlayerOwner();
      })
    )
  );

  initConfigurationGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initConfigurationGame),
        map(payload => this.gameService.initConfigurationGame(payload.gameConfig))
      ),
    { dispatch: false }
  );

  initGameConfigSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initGameConfigSuccess),
      exhaustMap(payload => [setGameConfig({ gameConfig: payload?.gameConfig })])
    )
  );

  updateGameStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateGameStatus),
      map(payload => {
        const gameStatus = payload?.gameStatus;
        switch (gameStatus.status) {
          case GameStatusEnum.pending:
            setTimeout(() => {
              this.routerFacade.navigateTo(`/${URL_GAME}`);
            }, 100);
            break;

          case GameStatusEnum.initialized:
            setTimeout(() => {
              this.routerFacade.navigateTo(`/${URL_GAME}`);
            }, 100);
            break;

          case GameStatusEnum.shopping:
            setTimeout(() => {
              this.routerFacade.navigateTo(`/${URL_GAME}/${URL_SHOPPING}`);
            }, 100);
            break;

          case GameStatusEnum.started:
            setTimeout(() => {
              this.routerFacade.navigateTo(`/${URL_BINGO}`);
            }, 100);
            break;
        }
        return setGameStatus({ gameStatus });
      })
    )
  );

  shoppingRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingRound),
      withLatestFrom(this.playerFacade.player$),
      map(([payload, player]) => {
        this.gameService.shoppingRound(payload.dashboardAmount, player);
        return changePlayerStatus({ playerStatus: GamePlayerStatus.shopping });
      })
    )
  );

  shoppingRoundSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shoppingRoundSuccess),
      exhaustMap(payload => {
        const { shoppingResponse } = payload;
        setTimeout(() => {
          this.routerFacade.navigateTo(`/${URL_GAME}/${URL_READY}`);
        }, 100);
        const gameRoundDashboards: Dashboard[] = this.utilsService.castshoppingResponseToDashboards(shoppingResponse?.dashboards);
        return [saveLocalPlayer({ player: shoppingResponse?.player }), changePlayerStatus({ playerStatus: GamePlayerStatus.ready }), setRoundDashboards({ gameRoundDashboards })];
      })
    )
  );

  updateGameRoundData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateGameRoundData),
      map(payload => setGameRoundData({ roundData: payload?.roundData }))
    )
  );

  updatePlayerDashboards$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePlayerDashboards),
        withLatestFrom(this.gameFacade.roundDashboards$),
        map(([payload, roundDashboards]) => {
          this.gameService.updateGameRoundData(payload.newValue, roundDashboards);
        })
      ),
    { dispatch: false }
  );
}
