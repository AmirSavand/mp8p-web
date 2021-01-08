import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/board';
import { Match } from 'src/app/shared/interfaces/match';
import { Player } from 'src/app/shared/interfaces/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * Base API URL
   */
  private static readonly BASE = environment.api;

  constructor(private http: HttpClient) {
  }

  register(payload: Partial<Player>): Observable<Player> {
    return this.http.post<Player>(`${ApiService.BASE}register/`, payload);
  }

  findMatch(maxPlayers = 1): Observable<Match> {
    return this.http.post<Match>(`${ApiService.BASE}find-match/${maxPlayers}`, {});
  }

  getMatch(id: string): Observable<Match> {
    return this.http.get<Match>(`${ApiService.BASE}match/${id}/`);
  }

  moveBlock(board: string, position: number): Observable<void> {
    return this.http.post<void>(`${ApiService.BASE}board/${board}/move-block/`, { position });
  }
}
