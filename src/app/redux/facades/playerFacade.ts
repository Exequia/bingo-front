import { Injectable } from '@angular/core';
import { Dashboard, GamePlayerStatus } from '@app/models';
import { PlayerService } from '@app/services/player/player.service';
import { PlayerUtils } from '@app/utils/player/player-utils.service';
import { Store } from '@ngrx/store';
import {
  changePlayerStatus,
  createNewGamePlayer,
  setPlayerAmount,
  setRoundDashboards,
} from '../actions';
import { selectPlayerFeature } from '../reducers';
import { selectGameGift } from '../selectors/gameSelectors';
import { AppState } from '../state';
import { RouterFacade } from './routerFacade';

@Injectable({
  providedIn: 'root',
})
export class PlayerFacade {
  player$ = this.store.select(selectPlayerFeature);
  gift$ = this.store.select(selectGameGift);

  constructor(
    private readonly store: Store<AppState>,
    private readonly playerUtils: PlayerUtils,
    private readonly routerFacade: RouterFacade
  ) {}

  createNewGamePlayer(name: string) {
    this.store.dispatch(createNewGamePlayer({ name }));
  }

  setPlayerStatusLazy() {
    this.changePlayerStatus(GamePlayerStatus.lazy);
  }

  setPlayerStatusShopping() {
    this.changePlayerStatus(GamePlayerStatus.shopping);
  }

  setPlayerStatusReady() {
    this.changePlayerStatus(GamePlayerStatus.ready);
  }

  private changePlayerStatus(playerStatus: GamePlayerStatus) {
    this.store.dispatch(changePlayerStatus({ playerStatus }));
  }

  setPlayerAmount(amount: number) {
    this.store.dispatch(setPlayerAmount({ amount }));
  }

  setPlayerDashboard(dashboardsValues: number[][][]) {
    const gameRoundDashboards: Dashboard[] =
      this.playerUtils.fillDashboards(dashboardsValues);
    this.store.dispatch(setRoundDashboards({ gameRoundDashboards }));
  }
}
