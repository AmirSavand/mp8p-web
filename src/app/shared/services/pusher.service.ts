import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PusherService {

  /**
   * Main pusher client
   */
  static pusher: Pusher;

  /**
   * Setup pusher and connect to it
   */
  static connect(): void {
    PusherService.pusher = new Pusher(environment.pusher.appKey, {
      cluster: environment.pusher.cluster,
      forceTLS: environment.pusher.forceTLS,
    });
  }

  /**
   * Disconnect from pusher
   */
  static disconnect(): void {
    PusherService.pusher.disconnect();
  }

  /**
   * @returns Pusher channel
   */
  static channel(name: string): Channel {
    return PusherService.pusher.channel(name);
  }

  /**
   * Subscribe to a channel
   */
  static subscribeChannel(name: string): void {
    PusherService.pusher.subscribe(name);
    PusherService.channel(name).bind('pusher:subscription_succeeded', (): void => {
      console.log('Connected to pusher channel successfully.', name);
    });
    PusherService.channel(name).bind('pusher:subscription_error', (status: number): void => {
      console.error('Failed to connect to pusher channel.', name, status);
    });
  }

  /**
   * Unsubscribe from a channel
   */
  static unsubscribeChannel(name: string): void {
    PusherService.pusher.unsubscribe(name);
    console.log('Disconnected from pusher channel successfully.', name);
  }

  /**
   * Bind a callback to a channel
   */
  static bindEvent<T>(channel: string, event: string, callback: (data: T) => void): void {
    PusherService.channel(channel).bind(event, callback);
  }

  /**
   * Unbind an event from a channel
   */
  static unbindEvent(channel: string, event: string): void {
    PusherService.channel(channel).unbind(event);
  }

  /**
   * Unbind all events on a channel
   */
  static unbindEvents(channel: string): void {
    PusherService.channel(channel).unbind_all();
  }
}
