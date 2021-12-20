export class Logger {
  tag: string;

  constructor(tag?: string) {
    if (tag) this.tag = tag;
  }

  log(message: string) {
    // eslint-disable-next-line no-console
    console.log(`${this.tag}: ${message}`);
  }
}
