import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/shared/interfaces/match';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  readonly isLoggedIn = Boolean(localStorage.player);

  loading: boolean;

  constructor(private api: ApiService,
              private router: Router) {
  }

  singlePlayer(): void {
    this.loading = true;
    this.api.findMatch().subscribe((data: Match): void => {
      this.router.navigate(['/match', data.id]);
    }, (): void => {
      this.loading = false;
    });
  }
}
