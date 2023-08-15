import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Match } from 'src/app/shared/interfaces/match';
import { Player } from 'src/app/shared/interfaces/player';
import { environment } from 'src/environments/environment';
import {concatMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * Base API URL
   */
  private static readonly BASE = environment.api;

  private moveBlockSubject = new Subject<{ board: string, position: number }>();

  constructor(private http: HttpClient) {
    this.moveBlockSubject.pipe(
        concatMap(({ board, position }) =>
          this.http.post<void>(`${ApiService.BASE}board/${board}/move-block/`, { position })
        )
      )
      .subscribe();
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
    this.moveBlockSubject.next({ board, position });
    return new Observable<void>(observer => {
      observer.complete();
    });
  }
}
