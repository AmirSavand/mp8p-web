import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReadmeRoutingModule } from './readme-routing.module';
import { ReadmeComponent } from './readme.component';

@NgModule({
  declarations: [
    ReadmeComponent,
  ],
  imports: [
    CommonModule,
    ReadmeRoutingModule,
  ],
})
export class ReadmeModule {
}
