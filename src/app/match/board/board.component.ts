import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Block } from 'src/app/shared/interfaces/block';
import { Board } from 'src/app/shared/interfaces/board';
import { Player } from 'src/app/shared/interfaces/player';
import { ApiService } from 'src/app/shared/services/api.service';
import { PusherService } from 'src/app/shared/services/pusher.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  // Used to know where blocks can move across the board.
  private static readonly MOVEMENTS: number[][] = [
    // Row 1
    [1, 3],
    [0, 2, 4],
    [1, 5],
    // Row 2
    [0, 4, 6],
    [1, 3, 5, 7],
    [2, 4, 8],
    // Row 3
    [3, 7],
    [4, 6, 8],
    [5, 7],
  ];

  // Hold observables to cancel them later.
  private readonly subscriptions = new Subscription();

  // List of all move block API calls for queueing.
  private readonly moveBlockSubject = new Subject<Observable<void>>();

  // Board unique UUID.
  @Input() id: string;

  // List of board blocks.
  @Input() blocks: Block[];

  // Owner of this board.
  @Input() player: Player;

  // Is board interactive or disabled?
  @Input() interactive: boolean;

  // Board image.
  @Input() image: number;

  // Board solved status.
  solved: boolean;

  // Does authenticated player have authority for this board?
  authority: boolean;

  // Space block reference.
  spaceBlock: Block;

  /**
   * @returns Board channel name.
   */
  get channel(): string {
    return `board-${this.id}`;
  }

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.authority = localStorage.player === this.player.id;
    if (!this.authority) {
      PusherService.subscribeChannel(this.channel);
      PusherService.bindEvent(this.channel, 'update', (data: Board): void => {
        this.updateBoard(data.blocks);
      });
    }
    this.updateBoard();
    /** Start making API calls for moving blocks. */
    this.subscriptions.add(
      this.moveBlockSubject
        .pipe(concatMap((data: Observable<void>): Observable<void> => data))
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    if (!this.authority) {
      PusherService.unsubscribeChannel(this.channel);
    }
    this.subscriptions.unsubscribe();
  }

  /**
   * Sort blocks by their current position for the view.
   * Check if the board is solved.
   */
  updateBoard(blocks: Block[] = this.blocks): void {
    this.blocks = blocks.sort((a: Block, b: Block): number => a.position - b.position);
    this.solved = !(this.blocks.some((block: Block): boolean => block.index !== block.position));
    this.spaceBlock = this.blocks.find((block: Block): boolean => block.is_space);
  }

  /**
   * Attempt to move a block to the empty space.
   */
  moveBlock(block: Block): void {
    const spacePosition: number = this.spaceBlock.position;
    // Used for API call condition.
    const canMoveBlock: boolean = (
      // Given block should not be a space block.
      !block.is_space &&
      // Given block should have the movement towards space.
      BoardComponent.MOVEMENTS[spacePosition].includes(block.position)
    );
    /**
     * Make API call only if the board is interactive,
     * player has authority over this board and this
     * block can be moved.
     */
    if (this.authority && this.interactive && canMoveBlock) {
      /** Add the API call to the queue. */
      this.moveBlockSubject.next(this.api.moveBlock(this.id, block.position));
      /**
       * Now move the block to space (swap them).
       */
      this.spaceBlock.position = block.position;
      block.position = spacePosition;
      this.updateBoard();
    }
  }

  /** Is triggered when the match is completed. */
  matchFinish(): void {
    this.subscriptions.unsubscribe();
  }
}
