export default class LineNumberRange {
  readonly start: number;
  readonly end: number;

  constructor(start: number, end?: number) {
    this.start = start;
    this.end = end ?? start;
  }

  public inRange(lineNumber: number): boolean {
    return this.start <= lineNumber && lineNumber <= this.end;
  }
}
