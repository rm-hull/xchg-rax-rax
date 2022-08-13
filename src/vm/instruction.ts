import { Index } from "parsimmon";
import Operand from "./operand";

type Metadata = {
  start: Index;
  end: Index;
};

export default class Instruction {
  readonly opcode: string;
  readonly operands: Operand[];
  readonly label?: string;
  readonly metadata?: Metadata;

  constructor(opcode: string, operands: Operand[], label?: string, metadata?: Metadata) {
    this.opcode = opcode;
    this.operands = operands;
    this.label = label;
    this.metadata = metadata;
  }
}
