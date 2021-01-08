import { MatchStatus } from 'src/app/shared/enums/match-status';
import { Board } from './board';
import { PlayerMinimal } from './player-minimal';

export interface Match {
  id: string;
  status: MatchStatus;
  boards: Board[];
  players: PlayerMinimal[];
  winner?: PlayerMinimal;
  boards_image: number;
}
