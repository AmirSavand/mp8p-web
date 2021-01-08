import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MultiplayerRoutingModule } from './multiplayer-routing.module';
import { MultiplayerComponent } from './multiplayer.component';

@NgModule({
  declarations: [
    MultiplayerComponent,
  ],
  imports: [
    CommonModule,
    MultiplayerRoutingModule,
  ],
})
export class MultiplayerModule {
}
