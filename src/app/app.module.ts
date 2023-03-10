import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { reducers, metaReducers } from './store/reducers';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './modules/material/material.module';
import { NewPlayerComponent } from './views/new-player/new-player.component';
import { NewPlayerFormComponent } from './components/new-player-form/new-player-form.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { GameComponent } from './views/game/game.component';
import { NewGameFormComponent } from './components/new-game-form/new-game-form.component';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { PlayerSummaryComponent } from './components/player-summary/player-summary.component';
import { appEffects } from './store';
import { ShoppingComponent } from './views/shopping/shopping.component';
import { WelcomeNewPlayerDialogComponent } from './components/dialogs/welcome-new-player-dialog/welcome-new-player-dialog.component';
import { BalanceComponent } from './components/balance/balance.component';
import { NewGameComponent } from './views/new-game/new-game.component';
import { RoundBoardComponent } from './views/round-board/round-board.component';
import { DashboardRowComponent } from './components/dashboard-row/dashboard-row.component';
import { DashboardRowCellComponent } from './components/dashboard-row-cell/dashboard-row-cell.component';
import { BingoComponent } from './views/bingo/bingo.component';
import { RoundValuesComponent } from './views/round-values/round-values.component';
import { RoundSummaryComponent } from './components/round-summary/round-summary.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    NewPlayerComponent,
    NewPlayerFormComponent,
    GameComponent,
    NewGameFormComponent,
    GameRoomComponent,
    PlayerSummaryComponent,
    ShoppingComponent,
    WelcomeNewPlayerDialogComponent,
    BalanceComponent,
    NewGameComponent,
    RoundBoardComponent,
    DashboardRowComponent,
    DashboardRowCellComponent,
    BingoComponent,
    RoundValuesComponent,
    RoundSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    MaterialModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
