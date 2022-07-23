import Operand from "./operand";

export default class Instruction {
  readonly name: string;
  readonly operands: Operand[];

  constructor(name: string, ...operands: Operand[]) {
    this.name = name;
    this.operands = operands;
  }
}
