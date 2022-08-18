import Operand from "./operand";

export default class Literal implements Operand {
  readonly name: string;
  readonly value: bigint;

  constructor(value: bigint) {
    this.name = `number(${value})`;
    this.value = value;
  }
}
