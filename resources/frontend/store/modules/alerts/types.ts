export interface AlertMessage {
  type: string;
  messages: string[];
}

export interface AlertsState {
  data: AlertMessage | object;
}
