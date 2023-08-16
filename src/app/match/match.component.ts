import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardComponent } from 'src/app/match/board/board.component';
import { MatchStatus } from 'src/app/shared/enums/match-status';
import { Match } from 'src/app/shared/interfaces/match';
import { ApiService } from 'src/app/shared/services/api.service';
import { PusherService } from 'src/app/shared/services/pusher.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit, OnDestroy {

  // Instances of boards of this match.
  @ViewChildren(BoardComponent) boards: QueryList<BoardComponent>;

  // Exposed for view.
  readonly matchStatus = MatchStatus;

  // This match data (includes players and boards).
  match: Match;

  minutes: number = 0;

  seconds: number = 0;

  milliseconds: number = 0;

  timerInterval: any;

  // Authenticated player ID.
  readonly player = localStorage.player;

  constructor(private route: ActivatedRoute,
              private api: ApiService) {
  }

  /**
   * @returns Channel name of this match.
   */
  get channel(): string {
    return `match-${this.match.id}`;
  }

  ngOnInit(): void {
    /**
     * Get and watch params for match ID.
     */
    this.route.params.subscribe((params: Params): void => {
      /**
       * Load match data.
       */
      this.api.getMatch(params.id).subscribe((match: Match): void => {
        this.match = match;
        /**
         * If match is not finished, connect to pusher for this match.
         */
        if (this.match.status !== MatchStatus.FINISH) {
          this.startTimer()
          PusherService.subscribeChannel(this.channel);
          PusherService.bindEvent(this.channel, 'update', (data: Match): void => {
            this.match = data;
            /**
             * If match is finished, disconnect pusher.
             */
            if (this.match.status === MatchStatus.FINISH) {
              PusherService.unsubscribeChannel(this.channel);
              this.stopTimer();
            }
          });
        }
      });
    });
  }

  protected startTimer(): void {
    const startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      this.minutes = Math.floor(elapsedTime / (1000 * 60));
      this.seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      this.milliseconds = elapsedTime % 1000;
    }, 1); // Update every 10 milliseconds
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    const stoppedTime = {
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds
    };
    if (this.match.winner.name) {
      const key = this.match.winner.name.toLowerCase().replace(/\s+/g, '_'); // Convert to lowercase and replace spaces with underscores
      localStorage.setItem(JSON.stringify(key), JSON.stringify(stoppedTime));
    }
  }

  ngOnDestroy(): void {
    if (this.match) {
      PusherService.unsubscribeChannel(this.channel);
    }
  }
}
