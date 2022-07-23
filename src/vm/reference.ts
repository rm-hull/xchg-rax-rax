import Operand from "./operand";

export default class Reference implements Operand {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
