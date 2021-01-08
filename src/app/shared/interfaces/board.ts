import { Block } from './block';

export interface Board {
  id: string;
  blocks: Block[];
  is_solved: boolean;
}
