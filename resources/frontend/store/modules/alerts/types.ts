export interface AlertMessage {
  type: "success" | "error" | "warning";
  messages: string[];
}

export interface AlertsState {
  data: AlertMessage | object;
}
