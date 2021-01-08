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
          PusherService.subscribeChannel(this.channel);
          PusherService.bindEvent(this.channel, 'update', (data: Match): void => {
            this.match = data;
            /**
             * If match is finished, disconnect pusher.
             */
            if (this.match.status === MatchStatus.FINISH) {
              PusherService.unsubscribeChannel(this.channel);
            }
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.match) {
      PusherService.unsubscribeChannel(this.channel);
    }
  }
}
