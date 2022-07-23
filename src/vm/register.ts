import Operand from "./operand";

export default class Register implements Operand {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
