export class Logger {
  tag: string;

  constructor(tag?: string) {
    if (tag) this.tag = tag;
  }

  log(message: string) {
    console.log(`${this.tag}: ${message}`);
  }
}