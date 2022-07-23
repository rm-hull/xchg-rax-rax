import Operand from "./operand";

export default class Literal implements Operand {
  readonly name: string;
  readonly value: number;

  constructor(value: number) {
    this.name = `number(${value})`;
    this.value = value;
  }
}
