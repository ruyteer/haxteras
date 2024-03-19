import { io } from "./server";

export function emitEvent(event: string, data: any) {
  io.emit(event, data);
}
