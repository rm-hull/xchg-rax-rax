import { Index } from "parsimmon";
import Operand from "./operand";

type Metadata = {
  start: Index;
  end: Index;
};

const OPCODES = {
  adc: undefined,
  add: undefined,
  and: undefined,
  cmp: undefined,
  cqo: undefined,
  inc: undefined,
  lea: undefined,
  loop: undefined,
  mov: undefined,
  neg: undefined,
  not: undefined,
  or: undefined,
  pop: undefined,
  push: undefined,
  rcr: undefined,
  ror: undefined,
  sbb: undefined,
  shl: undefined,
  shr: undefined,
  sub: undefined,
  xadd: undefined,
  xchg: undefined,
  xor: undefined,
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

  static isValidOpcode(name: string): boolean {
    return name in OPCODES;
  }
}
