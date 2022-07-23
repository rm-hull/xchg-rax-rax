import { Index } from "parsimmon";
import Operand from "./operand";

type Metadata = {
  start: Index;
  end: Index;
};

export type Instruction = {
  opcode: string;
  operands: Operand[];
  metadata?: Metadata;
  label?: string;
};
