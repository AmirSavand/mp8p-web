import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';

import { BoardComponent } from './board/board.component';
import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './match.component';


@NgModule({
  declarations: [
    MatchComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    HeaderModule,
  ],
})
export class MatchModule {
}
