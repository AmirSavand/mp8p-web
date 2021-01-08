import { Component, OnDestroy, OnInit } from '@angular/core';
import { PusherService } from './shared/services/pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    PusherService.connect();
  }

  ngOnDestroy(): void {
    PusherService.disconnect();
  }
}
