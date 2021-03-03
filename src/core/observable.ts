export class Observable {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private listeners: { [name: string]: Function[] } = {};

  // eslint-disable-next-line @typescript-eslint/ban-types
  public subscribe(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public unsubscribe(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public next(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}
