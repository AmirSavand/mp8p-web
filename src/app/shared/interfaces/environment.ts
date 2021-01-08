export interface Environment {
  development: boolean;
  api: string;
  pusher: {
    cluster: string;
    forceTLS: boolean;
    appKey: string;
  };
}
