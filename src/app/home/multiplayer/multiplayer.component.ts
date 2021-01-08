import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/shared/interfaces/match';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss'],
})
export class MultiplayerComponent {

  players = [2, 3, 4];

  loading: boolean;

  constructor(private api: ApiService,
              private router: Router) {
  }

  findMatch(maxPlayers: number): void {
    this.loading = true;
    this.api.findMatch(maxPlayers).subscribe((data: Match): void => {
      this.router.navigate(['/match', data.id]);
    }, (): void => {
      this.loading = false;
    });
  }
}
